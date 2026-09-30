export interface ChecklistItem {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  type: 'CERTIFICATE' | 'DOCUMENT';
  authority: string;
  authorityHi: string;
  authorityMr: string;
  legalAct: string;
  slaDays: number;
  mandatory: boolean;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
}

export interface BusinessCategoryChecklist {
  id: string;
  title: string;
  titleHi: string;
  titleMr: string;
  iconName: string;
  badge: string;
  badgeHi: string;
  badgeMr: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  items: ChecklistItem[];
}

export const BUSINESS_CHECKLISTS: BusinessCategoryChecklist[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing Industry',
    titleHi: 'विनिर्माण उद्योग (मैन्युफैक्चरिंग)',
    titleMr: 'उत्पादन उद्योग (मॅन्युफॅक्चरिंग)',
    iconName: 'Factory',
    badge: 'Industrial Production',
    badgeHi: 'औद्योगिक उत्पादन',
    badgeMr: 'औद्योगिक उत्पादन',
    description: 'Statutory clearances and documents required before setting up a manufacturing plant or engineering facility.',
    descriptionHi: 'विनिर्माण संयंत्र अथवा इंजीनियरिंग इकाई स्थापित करने के लिए आवश्यक वैधानिक प्रमाणपत्र व दस्तावेज़।',
    descriptionMr: 'उत्पादन प्रकल्प किंवा अभियांत्रिकी युनिट स्थापन करण्यासाठी लागणारी आवश्यक वैधानिक प्रमाणपत्रे व कागदपत्रे.',
    items: [
      {
        id: 'MFG-1',
        name: 'Consent to Establish (CTE) under Water & Air Act',
        nameHi: 'जल एवं वायु अधिनियम के अंतर्गत स्थापना सहमति (CTE)',
        nameMr: 'जल व वायू कायद्यांतर्गत स्थापनेची संमती (CTE)',
        type: 'CERTIFICATE',
        authority: 'State Pollution Control Board (SPCB / MPCB)',
        authorityHi: 'राज्य प्रदूषण नियंत्रण बोर्ड (SPCB)',
        authorityMr: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)',
        legalAct: 'Water Act 1974 & Air Act 1981',
        slaDays: 30,
        mandatory: true,
        description: 'Mandatory environmental clearance before starting any site construction or machinery erection.',
        descriptionHi: 'स्थल निर्माण अथवा मशीनरी स्थापना से पूर्व अनिवार्य पर्यावरणीय अनापत्ति प्रमाणपत्र।',
        descriptionMr: 'जागेवर बांधकाम किंवा मशिनरी उभारण्यापूर्वी आवश्यक पर्यावरण मंजुरी प्रमाणपत्र.'
      },
      {
        id: 'MFG-2',
        name: 'Factory Building Plan Approval & Initial Licence',
        nameHi: 'कारखाना भवन योजना अनुमोदन एवं प्रारंभिक लाइसेंस',
        nameMr: 'कारखाना इमारत आराखडा मंजुरी व प्रारंभिक परवाना',
        type: 'CERTIFICATE',
        authority: 'Directorate of Industrial Safety & Health (DISH)',
        authorityHi: 'औद्योगिक सुरक्षा एवं स्वास्थ्य निदेशालय (DISH)',
        authorityMr: 'औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH)',
        legalAct: 'The Factories Act, 1948 - Section 6',
        slaDays: 20,
        mandatory: true,
        description: 'Statutory approval for factory floor layouts, machinery clearances, and worker safety provisions.',
        descriptionHi: 'कारखाना लेआउट, मशीनरी निकासी एवं श्रमिक सुरक्षा प्रावधानों हेतु वैधानिक स्वीकृति।',
        descriptionMr: 'कारखाना आराखडा, मशिनरी सुरक्षितता व कामगार कल्याण नियमांनुसार मंजुरी.'
      },
      {
        id: 'MFG-3',
        name: 'Pre-Construction Fire Safety NOC',
        nameHi: 'निर्माण-पूर्व अग्निशमन सुरक्षा एनओसी',
        nameMr: 'बांधकाम-पूर्व अग्निशामक सुरक्षा ना-हरकत प्रमाणपत्र (Fire NOC)',
        type: 'CERTIFICATE',
        authority: 'State Fire & Emergency Services',
        authorityHi: 'राज्य अग्निशमन एवं आपातकालीन सेवाएं',
        authorityMr: 'राज्य अग्निशामक व आपत्कालीन सेवा विभाग',
        legalAct: 'Fire Prevention and Life Safety Measures Act',
        slaDays: 15,
        mandatory: true,
        description: 'Fire hydrant schematics, emergency evacuation exits, and fire-fighting setup approval.',
        descriptionHi: 'फायर हाइड्रेंट लेआउट, आपातकालीन निकास योजना एवं अग्निशामक व्यवस्था का अनुमोदन।',
        descriptionMr: 'अग्निशामक यंत्रणा, आणीबाणीच्या वेळी बाहेर पडण्याचा मार्ग व अग्निरोधक तपासणी मंजुरी.'
      },
      {
        id: 'MFG-4',
        name: 'High-Tension / Industrial Power Load Feasibility Sanction',
        nameHi: 'हाई-टेंशन / औद्योगिक विद्युत भार स्वीकृति',
        nameMr: 'उच्च दाब / औद्योगिक वीज भार मंजुरी',
        type: 'CERTIFICATE',
        authority: 'State Electricity Distribution Company (DISCOM / MSEDCL)',
        authorityHi: 'राज्य विद्युत वितरण निगम',
        authorityMr: 'महावितरण (MSEDCL)',
        legalAct: 'The Electricity Act, 2003',
        slaDays: 14,
        mandatory: true,
        description: 'Technical grid feeder feasibility and sanctioned electrical substation load approval.',
        descriptionHi: 'विद्युत ग्रिड व्यवहार्यता एवं सबस्टेशन लोड का तकनीकी अनुमोदन।',
        descriptionMr: 'वीज उपकेंद्र व ग्रिड जोडणी व्यवहार्यता आणि वीज भार मंजुरी प्रमाणपत्र.'
      },
      {
        id: 'MFG-5',
        name: 'Detailed Project Report (DPR) & Machine Flow Diagram',
        nameHi: 'विस्तृत परियोजना रिपोर्ट (DPR) एवं मशीन प्रक्रिया आरेख',
        nameMr: 'सविस्तर प्रकल्प अहवाल (DPR) व उत्पादन प्रक्रिया प्रवाह तक्ता',
        type: 'DOCUMENT',
        authority: 'Directorate of Industries',
        authorityHi: 'उद्योग निदेशालय',
        authorityMr: 'उद्योग संचालनालय',
        legalAct: 'Industrial Facilitation Rules',
        slaDays: 7,
        mandatory: true,
        description: 'Project capital cost, manufacturing process flowchart, and equipment capacity breakdown.',
        descriptionHi: 'पूंजीगत लागत, विनिर्माण प्रक्रिया चार्ट और मशीनरी क्षमता का संपूर्ण ब्योरा।',
        descriptionMr: 'भांडवली खर्च, उत्पादन प्रक्रिया व यंत्रसामग्री क्षमता यासह सविस्तर तांत्रिक प्रकल्प अहवाल.'
      }
    ]
  },
  {
    id: 'food',
    title: 'Food Business & Agro-Processing',
    titleHi: 'खाद्य व्यवसाय एवं खाद्य प्रसंस्करण (FSSAI)',
    titleMr: 'अन्न प्रक्रिया व खाद्य व्यवसाय (FSSAI)',
    iconName: 'Utensils',
    badge: 'Food Safety & Hygiene',
    badgeHi: 'खाद्य सुरक्षा एवं स्वच्छता',
    badgeMr: 'अन्न सुरक्षा व स्वच्छता',
    description: 'Mandatory statutory licences and testing documents required for food packaging, manufacturing, and distribution.',
    descriptionHi: 'खाद्य पैकेजिंग, निर्माण एवं वितरण इकाइयों के लिए आवश्यक अनिवार्य खाद्य सुरक्षा लाइसेंस।',
    descriptionMr: 'अन्न प्रक्रिया, पॅकेजिंग व वितरण व्यवसायासाठी लागणारे आवश्यक वैधानिक परवाने व कागदपत्रे.',
    items: [
      {
        id: 'FOOD-1',
        name: 'FSSAI State / Central Manufacturing Licence',
        nameHi: 'FSSAI राज्य / केंद्रीय विनिर्माण खाद्य लाइसेंस',
        nameMr: 'FSSAI राज्य / केंद्रीय अन्न उत्पादन परवाना',
        type: 'CERTIFICATE',
        authority: 'Food Safety and Standards Authority of India (FSSAI)',
        authorityHi: 'भारतीय खाद्य संरक्षा एवं मानक प्राधिकरण (FSSAI)',
        authorityMr: 'भारतीय अन्न सुरक्षितता व मानके प्राधिकरण (FSSAI)',
        legalAct: 'Food Safety and Standards Act, 2006',
        slaDays: 21,
        mandatory: true,
        description: 'Primary statutory food licence based on annual turnover and production capacity.',
        descriptionHi: 'वार्षिक टर्नओवर और उत्पादन क्षमता के आधार पर अनिवार्य मुख्य खाद्य लाइसेंस।',
        descriptionMr: 'वार्षिक उलाढाल व उत्पादन क्षमतेवर आधारित मुख्य कायदेशीर अन्न सुरक्षा परवाना.'
      },
      {
        id: 'FOOD-2',
        name: 'Potable Water Quality Testing Report (BIS Standards)',
        nameHi: 'पेयजल गुणवत्ता परीक्षण रिपोर्ट (BIS मानक)',
        nameMr: 'पिण्याच्या पाण्याची गुणवत्ता चाचणी अहवाल (BIS मानके)',
        type: 'DOCUMENT',
        authority: 'NABL Accredited Testing Laboratory',
        authorityHi: 'NABL मान्यता प्राप्त प्रयोगशाला',
        authorityMr: 'NABL अधिकृत प्रयोगशाळा',
        legalAct: 'IS 10500:2012 Drinking Water Specification',
        slaDays: 7,
        mandatory: true,
        description: 'Laboratory chemical and bacteriological report confirming water suitability for food contact.',
        descriptionHi: 'खाद्य उत्पादन में प्रयुक्त जल की रासायनिक एवं जीवाणु परीक्षण रिपोर्ट।',
        descriptionMr: 'अन्न प्रक्रियेत वापरल्या जाणाऱ्या पाण्याची रासायनिक व जैविक शुद्धता चाचणी अहवाल.'
      },
      {
        id: 'FOOD-3',
        name: 'Trade Licence / Municipal Health NOC',
        nameHi: 'व्यापार लाइसेंस / नगर निगम स्वास्थ्य एनओसी',
        nameMr: 'व्यापार परवाना / महानगरपालिका आरोग्य एनओसी',
        type: 'CERTIFICATE',
        authority: 'Local Municipal Corporation / Urban Local Body',
        authorityHi: 'स्थानीय नगर निगम / नगरपालिका',
        authorityMr: 'स्थानिक महानगरपालिका / नगरपालिका',
        legalAct: 'Municipal Corporation Public Health By-laws',
        slaDays: 14,
        mandatory: true,
        description: 'Public health hygiene verification for premises handling human edible goods.',
        descriptionHi: 'परिसर की स्वच्छता एवं सार्वजनिक स्वास्थ्य सुरक्षा सत्यापन।',
        descriptionMr: 'अन्न हाताळणी जागेची सार्वजनिक आरोग्य व स्वच्छता तपासणी परवाना.'
      },
      {
        id: 'FOOD-4',
        name: 'Food Safety Management System (FSMS) Plan',
        nameHi: 'खाद्य सुरक्षा प्रबंधन प्रणाली (FSMS) योजना',
        nameMr: 'अन्न सुरक्षा व्यवस्थापन प्रणाली (FSMS) योजना',
        type: 'DOCUMENT',
        authority: 'FSSAI Food Safety Inspectorate',
        authorityHi: 'FSSAI खाद्य सुरक्षा निरीक्षणालय',
        authorityMr: 'FSSAI तपासणी विभाग',
        legalAct: 'HACCP / ISO 22000 Guidelines',
        slaDays: 5,
        mandatory: true,
        description: 'Hazard Analysis and Critical Control Points (HACCP) hygiene blueprint.',
        descriptionHi: 'संभाव्य संदूषण नियंत्रण एवं स्वच्छता मानक संचालन योजना।',
        descriptionMr: 'अन्न भेसळ व दूषितीकरण टाळण्यासाठीची सुरक्षा व स्वच्छता कार्यपद्धती आराखडा.'
      }
    ]
  },
  {
    id: 'construction',
    title: 'Construction & Real Estate Development',
    titleHi: 'निर्माण एवं रियल एस्टेट विकास',
    titleMr: 'बांधकाम व रिअल इस्टेट विकास',
    iconName: 'Building',
    badge: 'Infrastructure & Buildings',
    badgeHi: 'बुनियादी ढांचा एवं भवन',
    badgeMr: 'पायाभूत सुविधा व इमारती',
    description: 'Required zoning approvals, building sanctions, and structural stability certificates for commercial/industrial structures.',
    descriptionHi: 'व्यावसायिक एवं औद्योगिक भवनों के निर्माण हेतु आवश्यक ज़ोनिंग, भवन अनुमति और संरचनात्मक सुरक्षा प्रमाणपत्र।',
    descriptionMr: 'व्यावसायिक व औद्योगिक बांधकामासाठी आवश्यक असलेले नगररचना परवाने व संरचनात्मक प्रमाणपत्रे.',
    items: [
      {
        id: 'CON-1',
        name: 'Building Plan Sanction & Commencement Certificate (CC)',
        nameHi: 'भवन निर्माण योजना स्वीकृति एवं निर्माण प्रारंभ प्रमाणपत्र (CC)',
        nameMr: 'इमारत आराखडा मंजुरी व बांधकाम प्रारंभ प्रमाणपत्र (Commencement Certificate)',
        type: 'CERTIFICATE',
        authority: 'Town & Country Planning Directorate / Municipal Planning Authority',
        authorityHi: 'नगर एवं ग्राम नियोजन निदेशालय / स्थानीय विकास प्राधिकरण',
        authorityMr: 'नगररचना संचालनालय / नियोजन प्राधिकरण',
        legalAct: 'Maharashtra Regional and Town Planning (MRTP) Act',
        slaDays: 30,
        mandatory: true,
        description: 'Statutory approval for architectural elevations, FSI/FAR compliance, and set-backs.',
        descriptionHi: 'वास्तुशिल्प नक्शे, एफएसआई और सेट-बैक मानकों का वैधानिक अनुमोदन।',
        descriptionMr: 'एफएसआय, वास्तुशिल्प आराखडा व बांधकाम नियमावलीनुसार अधिकृत बांधकाम प्रारंभ प्रमाणपत्र.'
      },
      {
        id: 'CON-2',
        name: 'Structural Stability Certificate by Licensed Engineer',
        nameHi: 'पंजीकृत स्ट्रक्चरल इंजीनियर द्वारा संरचनात्मक स्थिरता प्रमाणपत्र',
        nameMr: 'नोंदणीकृत स्ट्रक्चरल इंजिनिअरकडून संरचनात्मक स्थिरता प्रमाणपत्र',
        type: 'CERTIFICATE',
        authority: 'Chartered Structural Engineers Association',
        authorityHi: 'पंजीकृत स्ट्रक्चरल इंजीनियर बोर्ड',
        authorityMr: 'नोंदणीकृत स्ट्रक्चरल इंजिनिअर प्राधिकरण',
        legalAct: 'National Building Code of India (NBC 2016)',
        slaDays: 10,
        mandatory: true,
        description: 'Earthquake resistance, dead/live load verification stamp by licensed structural engineer.',
        descriptionHi: 'भूकंप रोधी क्षमता एवं भार वहन सुरक्षा का अधिकृत तकनीकी प्रमाणपत्र।',
        descriptionMr: 'भूकंपरोधक क्षमता व लोड बेअरिंग तांत्रिक पडताळणी प्रमाणपत्र.'
      },
      {
        id: 'CON-3',
        name: 'Non-Agricultural (NA) Land Conversion Order',
        nameHi: 'अकृषि (NA) भूमि रूपांतरण आदेश',
        nameMr: 'अकृषिक (NA) जमीन रूपांतरण आदेश',
        type: 'CERTIFICATE',
        authority: 'District Collectorate / Revenue Department',
        authorityHi: 'जिलाधिकारी कार्यालय / राजस्व विभाग',
        authorityMr: 'जिल्हाधिकारी कार्यालय / महसूल विभाग',
        legalAct: 'Maharashtra Land Revenue Code, 1966',
        slaDays: 45,
        mandatory: true,
        description: 'Statutory conversion of agricultural land tenure to industrial or commercial use.',
        descriptionHi: 'कृषि भूमि को औद्योगिक अथवा व्यावसायिक उपयोग में बदलने का आधिकारिक राजस्व आदेश।',
        descriptionMr: 'शेती जमिनीचे औद्योगिक किंवा व्यावसायिक वापरामध्ये रूपांतरणाचा अधिकृत महसूल आदेश.'
      },
      {
        id: 'CON-4',
        name: 'Environmental Impact Assessment (EIA) / State Clearance',
        nameHi: 'पर्यावरणीय प्रभाव मूल्यांकन (EIA) स्वीकृति',
        nameMr: 'पर्यावरणीय परिणाम मूल्यांकन (EIA) मंजुरी',
        type: 'CERTIFICATE',
        authority: 'State Environmental Impact Assessment Authority (SEIAA)',
        authorityHi: 'राज्य पर्यावरण प्रभाव मूल्यांकन प्राधिकरण (SEIAA)',
        authorityMr: 'राज्य पर्यावरण मूल्यांकन प्राधिकरण (SEIAA)',
        legalAct: 'Environment (Protection) Act, 1986',
        slaDays: 60,
        mandatory: false,
        description: 'Required for built-up area exceeding 20,000 sq. meters.',
        descriptionHi: '20,000 वर्ग मीटर से अधिक निर्मित क्षेत्र हेतु अनिवार्य पर्यावरणीय स्वीकृति।',
        descriptionMr: '२०,००० चौ. मीटरपेक्षा जास्त बांधकाम क्षेत्रफळासाठी आवश्यक पर्यावरण मंजुरी.'
      }
    ]
  },
  {
    id: 'it',
    title: 'Information Technology & Software (IT/ITES)',
    titleHi: 'सूचना प्रौद्योगिकी एवं सॉफ्टवेयर (IT / ITES)',
    titleMr: 'माहिती तंत्रज्ञान व सॉफ्टवेअर सेवा (IT / ITES)',
    iconName: 'Laptop',
    badge: 'Technology Services',
    badgeHi: 'प्रौद्योगिकी सेवाएं',
    badgeMr: 'तंत्रज्ञान सेवा',
    description: 'Fast-tracked green-channel clearances, STPI registration, and cyber infrastructure certifications for tech startups and IT parks.',
    descriptionHi: 'टेक स्टार्टअप्स और आईटी पार्कों के लिए त्वरित ग्रीन-चैनल स्वीकृतियां, एसटीपीआई पंजीकरण एवं साइबर प्रमाणपत्र।',
    descriptionMr: 'आयटी कंपन्या व तंत्रज्ञान स्टार्टअप्ससाठी वेगवान ग्रीन-चॅनल मंजुऱ्या व नोंदणी कागदपत्रे.',
    items: [
      {
        id: 'IT-1',
        name: 'STPI / Non-STPI Unit Registration',
        nameHi: 'एसटीपीआई (STPI) / नॉन-एसटीपीआई इकाई पंजीकरण',
        nameMr: 'एसटीपीआय (STPI) नोंदणी प्रमाणपत्र',
        type: 'CERTIFICATE',
        authority: 'Software Technology Parks of India (STPI), MeitY',
        authorityHi: 'सॉफ्टवेयर टेक्नोलॉजी पार्क्स ऑफ इंडिया (STPI)',
        authorityMr: 'सॉफ्टवेअर टेक्नॉलॉजी पार्क्स ऑफ इंडिया (STPI)',
        legalAct: 'Foreign Trade Policy & Export Oriented Units Scheme',
        slaDays: 14,
        mandatory: true,
        description: 'Statutory registration for software export tracking and customs duty concessions.',
        descriptionHi: 'सॉफ्टवेयर निर्यात एवं सीमा शुल्क छूट हेतु वैधानिक आईटी पंजीकरण।',
        descriptionMr: 'सॉफ्टवेअर निर्यात व कर सवलतींसाठी आवश्यक अधिकृत आयटी नोंदणी.'
      },
      {
        id: 'IT-2',
        name: 'Shops and Commercial Establishment Registration (Gumasta)',
        nameHi: 'दुकान एवं वाणिज्यिक प्रतिष्ठान पंजीकरण (गुमास्ता)',
        nameMr: 'दुकाने व आस्थापना नोंदणी (गुमास्ता परवाना)',
        type: 'CERTIFICATE',
        authority: 'State Labour Department',
        authorityHi: 'राज्य श्रम विभाग',
        authorityMr: 'कामगार विभाग',
        legalAct: 'Maharashtra Shops and Establishments Act',
        slaDays: 7,
        mandatory: true,
        description: 'Legal registration enabling commercial operation, flexible shifts, and women employee night work compliance.',
        descriptionHi: 'वाणिज्यिक संचालन, लचीली शिफ्ट और कर्मचारी कल्याण नियमों का वैधानिक पंजीकरण।',
        descriptionMr: 'कार्यालय सुरू करण्यासाठी आणि लवचिक शिफ्टमध्ये कामकाज करण्यासाठी आवश्यक कामगार नोंदणी.'
      },
      {
        id: 'IT-3',
        name: 'Dual Power Feeder / Dedicated Fiber Right of Way (RoW)',
        nameHi: 'दोहरा विद्युत फीडर / ब्रॉडबैंड फाइबर राइट ऑफ वे (RoW)',
        nameMr: 'दुहेरी वीज फीडर व इंटरनेट फायबर राईट ऑफ वे (RoW) मंजुरी',
        type: 'CERTIFICATE',
        authority: 'Municipal Corporation / DISCOM',
        authorityHi: 'नगर निगम / विद्युत कंपनी',
        authorityMr: 'महानगरपालिका व वीज कंपनी',
        legalAct: 'Indian Telegraph Right of Way Rules',
        slaDays: 10,
        mandatory: false,
        description: 'Ensures 99.99% uptime redundancy for mission-critical data centres and IT operations.',
        descriptionHi: 'डेटा सेंटर और आईटी संचालन के लिए निर्बाध बिजली एवं फाइबर कनेक्टिविटी स्वीकृति।',
        descriptionMr: 'डेटा सेंटर्स व आयटी कामकाजासाठी अखंडित वीज व इंटरनेट कनेक्टिव्हिटी मंजुरी.'
      }
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Pharmaceuticals',
    titleHi: 'स्वास्थ्य सेवा एवं फार्मास्यूटिकल्स',
    titleMr: 'आरोग्य सेवा व औषध निर्माण (हेल्थकेअर)',
    iconName: 'HeartPulse',
    badge: 'Medical & Life Sciences',
    badgeHi: 'चिकित्सा एवं जीवन विज्ञान',
    badgeMr: 'वैद्यकीय व औषध निर्माण',
    description: 'Rigorous drug manufacturing licences, bio-medical waste clearances, and clinical establishment registrations.',
    descriptionHi: 'दवा निर्माण लाइसेंस, जैव-चिकित्सा अपशिष्ट (बायो-वेस्ट) प्रबंधन और नैदानिक प्रतिष्ठान अनुमतियां।',
    descriptionMr: 'औषध उत्पादन परवाना, बायो-मेडिकल कचरा व्यवस्थापन व रुग्णालय नोंदणी प्रमाणपत्रे.',
    items: [
      {
        id: 'MED-1',
        name: 'Drug Manufacturing Licence (Form 25 / Form 28)',
        nameHi: 'औषधि निर्माण लाइसेंस (फॉर्म 25 / फॉर्म 28)',
        nameMr: 'औषध उत्पादन परवाना (फॉर्म २५ / २८)',
        type: 'CERTIFICATE',
        authority: 'Food and Drugs Administration (FDA)',
        authorityHi: 'खाद्य एवं औषधि प्रशासन (FDA)',
        authorityMr: 'अन्न व औषध प्रशासन (FDA)',
        legalAct: 'Drugs and Cosmetics Act, 1940',
        slaDays: 45,
        mandatory: true,
        description: 'Mandatory licence for formulating, manufacturing, and batch testing pharmaceuticals.',
        descriptionHi: 'दवाओं के निर्माण एवं बैच परीक्षण हेतु अनिवार्य विनियामक लाइसेंस।',
        descriptionMr: 'औषधे तयार करणे, पॅक करणे व चाचणी करण्यासाठी आवश्यक एफडीए परवाना.'
      },
      {
        id: 'MED-2',
        name: 'Bio-Medical Waste Management (BMWM) Authorization',
        nameHi: 'जैव-चिकित्सा अपशिष्ट प्रबंधन (BMWM) प्राधिकरण',
        nameMr: 'बायो-मेडिकल कचरा व्यवस्थापन (BMWM) अधिकृतता',
        type: 'CERTIFICATE',
        authority: 'State Pollution Control Board (SPCB / MPCB)',
        authorityHi: 'राज्य प्रदूषण नियंत्रण बोर्ड (SPCB)',
        authorityMr: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)',
        legalAct: 'Bio-Medical Waste Management Rules, 2016',
        slaDays: 25,
        mandatory: true,
        description: 'Authorization for segregation, color-coded collection, and incineration agreement.',
        descriptionHi: 'चिकित्सा अपशिष्ट के सुरक्षित पृथक्करण, भंडारण एवं निस्तारण का आधिकारिक अनुबंध।',
        descriptionMr: 'वैद्यकीय कचरा वर्गीकरण, संकलन व विल्हेवाट लावण्यासाठीची प्रदूषण मंडळ मंजुरी.'
      },
      {
        id: 'MED-3',
        name: 'AERB Radiation Safety Clearance (for Imaging / Oncology)',
        nameHi: 'परमाणु ऊर्जा विनियामक परिषद (AERB) विकिरण सुरक्षा मंजूरी',
        nameMr: 'अणुऊर्जा नियामक मंडळ (AERB) रेडिएशन सुरक्षा मंजुरी',
        type: 'CERTIFICATE',
        authority: 'Atomic Energy Regulatory Board (AERB)',
        authorityHi: 'परमाणु ऊर्जा नियामक बोर्ड (AERB)',
        authorityMr: 'अणुऊर्जा नियामक मंडळ (AERB)',
        legalAct: 'Atomic Energy Act, 1962',
        slaDays: 30,
        mandatory: false,
        description: 'Required if operating industrial radiography, X-Ray, CT, or radiation therapy devices.',
        descriptionHi: 'एक्स-रे, सीटी स्कैन अथवा विकिरण उपकरणों के संचालन हेतु अनिवार्य सुरक्षा मंजूरी।',
        descriptionMr: 'एक्स-रे, स्कॅनिंग किंवा रेडिएशन उपकरणांच्या वापरासाठी आवश्यक राष्ट्रीय सुरक्षा मंजुरी.'
      }
    ]
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Agri-Business',
    titleHi: 'कृषि एवं कृषि व्यवसाय (एग्री-बिजनेस)',
    titleMr: 'कृषी व कृषी प्रक्रिया व्यवसाय',
    iconName: 'Sprout',
    badge: 'Farm & Cold Chain',
    badgeHi: 'कृषि एवं कोल्ड चेन',
    badgeMr: 'शेती व शीतगृहे',
    description: 'Seed/fertilizer distribution licences, cold storage warehousing accreditation, and APMC trader permissions.',
    descriptionHi: 'बीज/उर्वरक लाइसेंस, कोल्ड स्टोरेज गोदाम प्रमाणन एवं कृषि उपज मंडी समिति (APMC) अनुमतियां।',
    descriptionMr: 'बियाणे/खते विक्री परवाना, शीतगृह साठवणूक प्रमाणीकरण व कृषी उत्पन्न बाजार समिती परवानग्या.',
    items: [
      {
        id: 'AGRI-1',
        name: 'Insecticides / Fertilizer / Seed Manufacturing & Sale Licence',
        nameHi: 'कीटनाशक / उर्वरक / बीज निर्माण एवं बिक्री लाइसेंस',
        nameMr: 'कीटकनाशके / खते / बियाणे उत्पादन व विक्री परवाना',
        type: 'CERTIFICATE',
        authority: 'Department of Agriculture',
        authorityHi: 'कृषि विभाग',
        authorityMr: 'कृषी विभाग',
        legalAct: 'Insecticides Act, 1968 & Fertilizer Control Order, 1985',
        slaDays: 20,
        mandatory: true,
        description: 'Statutory approval for formulation, processing, and distribution of agricultural inputs.',
        descriptionHi: 'कृषि आदानों के निर्माण एवं वितरण के लिए आवश्यक सरकारी लाइसेंस।',
        descriptionMr: 'शेतीसाठी आवश्यक खते व बियाणे तयार करणे व विक्री करण्यासाठीचा अधिकृत कृषी परवाना.'
      },
      {
        id: 'AGRI-2',
        name: 'Warehousing Development & Regulatory Authority (WDRA) Accreditation',
        nameHi: 'गोदाम विकास एवं विनियामक प्राधिकरण (WDRA) प्रमाणन',
        nameMr: 'गोदाम विकास व नियामक प्राधिकरण (WDRA) मान्यता',
        type: 'CERTIFICATE',
        authority: 'WDRA, Ministry of Consumer Affairs',
        authorityHi: 'गोदाम विकास विनियामक प्राधिकरण (WDRA)',
        authorityMr: 'वेअरहाऊसिंग विकास व नियामक प्राधिकरण (WDRA)',
        legalAct: 'Warehousing (Development and Regulation) Act, 2007',
        slaDays: 30,
        mandatory: false,
        description: 'Required for cold storage units issuing negotiable warehouse receipts (e-NWRs) to farmers.',
        descriptionHi: 'इलेक्ट्रॉनिक वेयरहाउस रसीदें जारी करने वाले कोल्ड स्टोरेज एवं गोदामों हेतु प्रमाणन।',
        descriptionMr: 'शेतकऱ्यांसाठी शीतगृहे व धान्य साठवणूक गोदामांना अधिकृत पावती देण्याची राष्ट्रीय मान्यता.'
      },
      {
        id: 'AGRI-3',
        name: 'Agricultural Produce Market Committee (APMC) Direct Purchase Licence',
        nameHi: 'कृषि उपज मंडी समिति (APMC) प्रत्यक्ष खरीद लाइसेंस',
        nameMr: 'कृषी उत्पन्न बाजार समिती (APMC) थेट खरेदी परवाना',
        type: 'CERTIFICATE',
        authority: 'State Agricultural Marketing Board (MSAMB)',
        authorityHi: 'राज्य कृषि विपणन बोर्ड',
        authorityMr: 'महाराष्ट्र राज्य कृषी पणन मंडळ',
        legalAct: 'APMC Act & Model Agricultural Produce Rules',
        slaDays: 15,
        mandatory: true,
        description: 'Enables direct procurement of crops from farmers without mandatory mandi intermediary auctions.',
        descriptionHi: 'किसानों से सीधे उपज खरीदने हेतु आवश्यक विधिक विपणन लाइसेंस।',
        descriptionMr: 'शेतकऱ्यांकडून थेट शेतमाल खरेदी करण्यासाठी आवश्यक असलेला पणन मंडळाचा परवाना.'
      }
    ]
  },
  {
    id: 'hospitality',
    title: 'Hotel, Resort & Hospitality',
    titleHi: 'होटल, रिसॉर्ट एवं आतिथ्य सत्कार',
    titleMr: 'हॉटेल, रिसॉर्ट व आदरातिथ्य व्यवसाय',
    iconName: 'Hotel',
    badge: 'Tourism & Leisure',
    badgeHi: 'पर्यटन एवं आवास',
    badgeMr: 'पर्यटन व हॉटेलिंग',
    description: 'Police lodging licences, municipal eating house registrations, swimming pool permits, and excise bar permissions.',
    descriptionHi: 'होटल लॉजिंग लाइसेंस, नगर निगम ईटिंग हाउस अनुमति, अग्निशमन और आबकारी (एक्साइज) परमिट।',
    descriptionMr: 'हॉटेल लॉजिंग परवाना, पोलीस खात्याची मंजुरी, आरोग्य तपासणी व अबकारी परवानग्या.',
    items: [
      {
        id: 'HOSP-1',
        name: 'Police Commissionerate Lodging / Premises Licence',
        nameHi: 'पुलिस आयुक्तालय लॉजिंग / परिसर लाइसेंस',
        nameMr: 'पोलीस आयुक्तालय लॉजिंग व निवास परवाना',
        type: 'CERTIFICATE',
        authority: 'City Police Commissionerate / District Magistrate',
        authorityHi: 'पुलिस आयुक्त कार्यालय / जिलाधिकारी',
        authorityMr: 'पोलीस आयुक्त कार्यालय / पोलीस अधीक्षक',
        legalAct: 'State Police Act (Public Amusement Rules)',
        slaDays: 21,
        mandatory: true,
        description: 'Guest security, CCTV surveillance compliance, and visitor record verification clearance.',
        descriptionHi: 'अतिथि सुरक्षा, सीसीटीवी निगरानी और आगंतुक रिकॉर्ड नियमों की पुलिस स्वीकृति।',
        descriptionMr: 'ग्राहकांची सुरक्षा, सीसीटीव्ही यंत्रणा व पाहुण्यांच्या नोंदवहीबाबत पोलीस विभागाची मंजुरी.'
      },
      {
        id: 'HOSP-2',
        name: 'Municipal Eating House Licence & Health NOC',
        nameHi: 'नगर निगम ईटिंग हाउस लाइसेंस एवं स्वास्थ्य एनओसी',
        nameMr: 'महानगरपालिका ईटिंग हाऊस परवाना व आरोग्य ना-हरकत',
        type: 'CERTIFICATE',
        authority: 'Municipal Health Directorate',
        authorityHi: 'नगर निगम स्वास्थ्य निदेशालय',
        authorityMr: 'महानगरपालिका आरोग्य विभाग',
        legalAct: 'Municipal Corporation Public Health Rules',
        slaDays: 14,
        mandatory: true,
        description: 'Hygiene and food preparation inspection clearance for restaurants, banquet halls, and kitchens.',
        descriptionHi: 'रेस्तरां, बैंक्वेट हॉल और रसोई के लिए स्वच्छता एवं स्वास्थ्य निरीक्षण स्वीकृति।',
        descriptionMr: 'हॉटेल किचन, उपहारगृह व भोजन व्यवस्थेसाठी आरोग्य विभागाचा अधिकृत परवाना.'
      },
      {
        id: 'HOSP-3',
        name: 'FL-3 Hotel Liquor & Bar Licence (Optional for Bar)',
        nameHi: 'FL-3 होटल शराब एवं बार लाइसेंस (यदि लागू हो)',
        nameMr: 'FL-3 हॉटेल मद्य व बार परवाना (लागू असल्यास)',
        type: 'CERTIFICATE',
        authority: 'State Excise Department',
        authorityHi: 'राज्य आबकारी विभाग (Excise)',
        authorityMr: 'राज्य उत्पादन शुल्क विभाग (Excise)',
        legalAct: 'State Prohibition and Excise Act',
        slaDays: 30,
        mandatory: false,
        description: 'Statutory licence for storage and serving of alcoholic beverages to permitted hotel guests.',
        descriptionHi: 'होटल परिसर में मद्य परोसने एवं भंडारण हेतु राज्य आबकारी विभाग का लाइसेंस।',
        descriptionMr: 'हॉटेलमधील पाहुण्यांसाठी मद्यपान सेवा उपलब्ध करण्यासाठी राज्य उत्पादन शुल्क विभागाचा परवाना.'
      }
    ]
  }
];
