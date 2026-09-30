import { prisma } from '../config/prisma';
import { HashUtil } from '../utils/hash';
import { TokenUtil } from '../utils/token';
import { Roles } from '../constants/roles';
import { AuditService } from '../middleware/audit.middleware';

export class AuthService {
  static async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: string;
    designation?: string;
    departmentCode?: string;
  }, ipAddress?: string) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() }
    });

    if (existing) {
      throw new Error('An account with this email address already exists');
    }

    // Lookup role
    const roleName = data.role || Roles.ENTREPRENEUR;
    let role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      role = await prisma.role.create({
        data: { name: roleName, description: `${roleName} user role` }
      });
    }

    // Lookup department if code provided
    let departmentId: string | null = null;
    if (data.departmentCode) {
      const dept = await prisma.department.findUnique({ where: { code: data.departmentCode } });
      if (dept) departmentId = dept.id;
    }

    const passwordHash = await HashUtil.hash(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        passwordHash,
        roleId: role.id,
        designation: data.designation,
        departmentId
      },
      include: { role: true, department: true }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'APPLICATION',
        title: 'Welcome to Industrial Approval Portal',
        message: 'Your single window account has been created. You can now register your business and apply for statutory clearances.'
      }
    });

    await AuditService.log({
      userId: user.id,
      action: 'USER_REGISTERED',
      entityType: 'AUTH',
      entityId: user.id,
      description: `User registered with role ${role.name}`,
      ipAddress
    });

    const token = TokenUtil.generate({
      userId: user.id,
      email: user.email,
      role: user.role.name,
      departmentId: user.departmentId
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role.name,
        designation: user.designation,
        department: user.department?.name,
        createdAt: user.createdAt
      },
      token
    };
  }

  static async login(data: { email: string; password: string }, ipAddress?: string) {
    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
      include: { role: true, department: true }
    });

    if (!user || !user.isActive) {
      throw new Error('Invalid email address or password');
    }

    const isMatch = await HashUtil.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email address or password');
    }

    const token = TokenUtil.generate({
      userId: user.id,
      email: user.email,
      role: user.role.name,
      departmentId: user.departmentId
    });

    await AuditService.log({
      userId: user.id,
      action: 'LOGIN',
      entityType: 'AUTH',
      entityId: user.id,
      description: `User logged in from ${ipAddress || 'unknown'}`,
      ipAddress
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role.name,
        designation: user.designation,
        department: user.department?.name,
        createdAt: user.createdAt
      },
      token
    };
  }

  static async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true, department: true, businesses: true }
    });

    if (!user) throw new Error('User not found');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role.name,
      designation: user.designation,
      department: user.department?.name,
      departmentId: user.departmentId,
      businesses: user.businesses,
      createdAt: user.createdAt
    };
  }
}
