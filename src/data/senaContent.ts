import {
  AcuerdoArticle,
  AnthemSection,
  ApprenticeRecord,
  InductionModule,
  InductionProgressMap,
  QuizQuestion,
  RegulationScenario,
  SymbolHotspot,
} from '../types/induction';

export const SENA_ESCUDO_URL = 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png';

export const INDUCTION_MODULES: InductionModule[] = [
  {
    id: 'identidad',
    number: '01',
    title: 'Identidad e Imagen Institucional',
    shortTitle: 'Imagen Institucional',
    subtitle: 'Historia desde 1957, misión, visión, valores y lineamientos del Manual de Identidad Visual SENA.',
    durationMinutes: 15,
    imageUrl: '/src/assets/images/module_imagen_institucional_1794325214741.jpg',
    imageAlt: 'Manual de identidad visual institucional y carné de aprendiz SENA sobre escritorio',
    slides: [
      {
        id: 'id-1',
        title: 'Origen y Misión Transformadora',
        kicker: 'Fundación · 21 de junio de 1957',
        summary:
          'El Servicio Nacional de Aprendizaje (SENA) nació mediante el Decreto Ley 118 de 1957, impulsado por Rodolfo Martínez Tono, con el propósito de brindar formación profesional integral gratuita a los trabajadores colombianos.',
        keyPoints: [
          'Entidad pública adscrita al Ministerio del Trabajo con autonomía administrativa.',
          'Misión: Invertir en el desarrollo social y técnico de los trabajadores colombianos mediante formación profesional integral.',
          'Presencia nacional en 33 Regionales y 117 Centros de Formación.',
        ],
        normativeRef: 'Decreto Ley 118 de 1957 · Ley 119 de 1994',
        narrationText:
          'El SENA fue fundado el 21 de junio de 1957 por iniciativa de Rodolfo Martínez Tono. Su misión es invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo formación profesional integral gratuita.',
      },
      {
        id: 'id-2',
        title: 'Uso Correcto de la Imagen Corporativa',
        kicker: 'Manual de Identidad Visual',
        summary:
          'La imagen institucional del SENA proyecta solidez, transparencia y pertenencia. Su color oficial es el Verde Institucional (#39A900), acompañado de tipografía limpia y márgenes de respeto alrededor del logosímbolo.',
        keyPoints: [
          'Nunca distorsionar, rotar ni cambiar los colores oficiales del logosímbolo SENA.',
          'El verde institucional (#39A900) simboliza esperanza, crecimiento y sostenibilidad.',
          'Portar el carné institucional de manera visible y usar adecuadamente el uniforme del programa.',
        ],
        normativeRef: 'Manual de Identidad Corporativa SENA · Dirección de Comunicaciones',
        narrationText:
          'La imagen institucional del SENA se rige por el Manual de Identidad Visual. El verde institucional representa crecimiento y esperanza, y el logosímbolo jamás debe deformarse ni alterar sus proporciones oficiales.',
      },
      {
        id: 'id-3',
        title: 'Principios, Valores y Compromiso Ético',
        kicker: 'Código de Integridad',
        summary:
          'Cada aprendiz representa al SENA dentro y fuera de los ambientes de formación. La integridad, el respeto, la honestidad y la diligencia guían la convivencia diaria.',
        keyPoints: [
          'Valores del servicio público: Honestidad, Respeto, Compromiso, Diligencia y Justicia.',
          'Cuidado permanente de las instalaciones, equipos, laboratorios y herramientas.',
          'Proyección de la cultura de paz, inclusión y trabajo colaborativo.',
        ],
        normativeRef: 'Código de Integridad SENA · Resolución 1-0168',
        narrationText:
          'Los aprendices SENA practican cinco valores fundamentales: honestidad, respeto, compromiso, diligencia y justicia, cuidando los ambientes de aprendizaje y fortaleciendo la convivencia.',
      },
    ],
  },
  {
    id: 'simbolos',
    number: '02',
    title: 'Símbolos Institucionales e Himno',
    shortTitle: 'Símbolos e Himno',
    subtitle: 'Significado oficial del Escudo, la Bandera, el Logosímbolo y las estrofas del Himno del SENA.',
    durationMinutes: 12,
    imageUrl: 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png',
    imageAlt: 'Escudo oficial del Servicio Nacional de Aprendizaje SENA',
    slides: [
      {
        id: 'sim-1',
        title: 'El Escudo y los Tres Sectores Económicos',
        kicker: 'Heráldica Institucional',
        summary:
          'El Escudo del SENA refleja los tres sectores productivos de la economía nacional en los que la entidad forma talento humano altamente calificado.',
        keyPoints: [
          'El Piñón dentado: representa el sector Industria y Manufactura.',
          'El Caduceo (vara alada con serpientes): simboliza el sector Comercio y Servicios.',
          'El Ramo de Café: representa el sector Primario y Extractivo (agropecuario).',
        ],
        normativeRef: 'Acuerdo Institucional de Símbolos SENA',
        narrationText:
          'El escudo del SENA representa los tres sectores económicos: el piñón simboliza la industria, el caduceo representa el comercio y los servicios, y el ramo de café simboliza el sector primario y agropecuario.',
      },
      {
        id: 'sim-2',
        title: 'La Bandera y el Logosímbolo',
        kicker: 'Representación Gráfica',
        summary:
          'La Bandera del SENA es de color blanco con el escudo en el centro, simbolizando paz, transparencia y formación integral. El Logosímbolo muestra la figura humana y el camino hacia el futuro.',
        keyPoints: [
          'Fondo blanco de la bandera: paz, tranquilidad y libertad de pensamiento.',
          'Logosímbolo: representa los senderos que el aprendiz recorre hacia su proyecto de vida.',
          'Presencia obligatoria en actos protocolarios, ceremonias de certificación y centros.',
        ],
        normativeRef: 'Protocolo Ceremonial e Imagen SENA',
        narrationText:
          'La bandera blanca con el escudo en el centro simboliza la paz y la transparencia. El logosímbolo representa al aprendiz avanzando por los caminos del conocimiento hacia su proyecto de vida.',
      },
      {
        id: 'sim-3',
        title: 'El Himno del SENA',
        kicker: 'Letra: Jesús Briceño · Música: Luis Sarmiento',
        summary:
          'El himno exalta a la juventud colombiana que construye patria mediante la técnica, la ciencia y el trabajo digno. Se entona en ceremonias de bienvenida y graduación.',
        keyPoints: [
          'El Coro invita a los estudiantes a marchar unidos con entusiasmo hacia el futuro.',
          'Las estrofas destacan la unión entre el trabajo manual, la ciencia y la paz.',
          'En el Laboratorio Multimedia puedes escuchar su melodía y seguir la letra sincronizada.',
        ],
        normativeRef: 'Himno Oficial del Servicio Nacional de Aprendizaje',
        narrationText:
          'El himno del SENA, con letra de Jesús Briceño y música de Luis Sarmiento, exalta la unión de la juventud colombiana en torno al trabajo, la técnica y la construcción de paz.',
      },
    ],
  },
  {
    id: 'reglamento',
    number: '03',
    title: 'Reglamento del Aprendiz (Acuerdo 009 de 2024)',
    shortTitle: 'Reglamento',
    subtitle: 'Marco normativo expedido por el Consejo Directivo Nacional: principios, derechos, deberes, novedades de permanencia, faltas y debido proceso.',
    durationMinutes: 20,
    imageUrl: '/src/assets/images/module_normativa_aprendiz_1794325215353.jpg',
    imageAlt: 'Aprendices estudiando el nuevo Reglamento del Aprendiz SENA Acuerdo 009 de 2024',
    slides: [
      {
        id: 'reg-1',
        title: 'Acuerdo 009 de 2024: Alcance y Principios Orientadores',
        kicker: 'Consejo Directivo Nacional · Normograma Institucional',
        summary:
          'El Acuerdo 009 de 2024 adopta el nuevo Reglamento del Aprendiz SENA y deroga formalmente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024. Regula a aspirantes y aprendices matriculados en formación presencial, virtual o combinada.',
        keyPoints: [
          'Derogatoria expresa de Acuerdos anteriores (Acuerdo 07 de 2012 y normativas conexas).',
          'Principios orientadores: Dignidad humana, inclusión, desarrollo sostenible, enfoque diferencial, solidaridad, territorialidad y autonomía.',
          'Aplicable en todos los Centros de Formación, ambientes virtuales (Zajuna) y espacios donde se desarrolle formación SENA.',
        ],
        normativeRef: 'Acuerdo 009 de 2024 · Disposiciones Preliminares (Artículos 1 al 3)',
        narrationText:
          'El Acuerdo 009 de 2024 expedido por el Consejo Directivo Nacional adopta el nuevo Reglamento del Aprendiz SENA, derogando el Acuerdo 07 de 2012 e incorporando principios de dignidad humana, inclusión, desarrollo sostenible y enfoque diferencial.',
      },
      {
        id: 'reg-2',
        title: 'Capítulo II: Derechos del Aprendiz y Representación',
        kicker: 'Garantías Formativas y Participación Democrática',
        summary:
          'Consagra las garantías de formación integral de calidad y gratuita, trato digno sin discriminación, evaluación justa y transparente, y el ejercicio de la democracia participativa.',
        keyPoints: [
          'Recibir formación profesional integral gratuita, pertinente y con acceso a recursos tecnológicos.',
          'Evaluación objetiva con derecho a retroalimentación oportuna y revisión de juicios evaluativos.',
          'Elegir y ser elegido democráticamente como vocero de ficha o representante de aprendices ante el Centro.',
          'Acceder a servicios de Bienestar al Aprendiz, biblioteca, orientación psicopedagógica y apoyos de sostenimiento.',
        ],
        normativeRef: 'Acuerdo 009 de 2024 · Capítulo II (Derechos y Representatividad)',
        narrationText:
          'En el Capítulo Segundo del Acuerdo 009 se garantizan tus derechos: recibir formación integral gratuita, ser evaluado de manera objetiva, recibir retroalimentación oportuna, y elegir o ser elegido vocero de ficha y representante de centro.',
      },
      {
        id: 'reg-3',
        title: 'Capítulo III: Deberes Fundamentales y Prohibiciones Expresas',
        kicker: 'Compromiso Ético y Disciplinario',
        summary:
          'El aprendiz asume la responsabilidad de su formación autónoma, el respeto por la comunidad educativa y el cuidado de los bienes del SENA, acatando las prohibiciones expresas.',
        keyPoints: [
          'Cumplir puntualmente con actividades y justificar inasistencias dentro de los 3 días hábiles siguientes con soporte válido.',
          'Portar visiblemente el carné institucional y usar adecuadamente uniformes y elementos de protección (SST).',
          'Prohibido el plagio o fraude académico, la suplantación de identidad y la alteración de evidencias en Zajuna o SOFIA Plus.',
          'Prohibido el porte de armas, sustancias psicoactivas o el uso comercial no autorizado de la marca o logosímbolo SENA.',
        ],
        normativeRef: 'Acuerdo 009 de 2024 · Capítulo III (Deberes y Prohibiciones)',
        narrationText:
          'El Capítulo Tercero fija deberes y prohibiciones: cumplir con las evidencias de aprendizaje, justificar ausencias en máximo tres días hábiles y abstenerte de cometer plagio, suplantación o usar la marca SENA sin autorización.',
      },
      {
        id: 'reg-4',
        title: 'Capítulo IV: Ingreso, Novedades, Permanencia y Etapa Productiva',
        kicker: 'Ciclo Formativo y Alternativas Productivas',
        summary:
          'Regula los trámites de permanencia académica, la prevención de deserción por ausencias y las modalidades de desarrollo y seguimiento de la Etapa Productiva.',
        keyPoints: [
          'Novedades de matrícula: Traslado de centro o programa, aplazamiento justificado (hasta 1 año) y retiro voluntario.',
          'Causal de deserción: 3 días consecutivos de inasistencia injustificada o acumulación de inasistencias sin soporte.',
          'Alternativas de etapa productiva: Contrato de aprendizaje, vinculación laboral, proyecto productivo, pasantía y monitoría.',
          'Registro obligatorio y periódico de bitácoras de seguimiento y concertación de visitas con el instructor técnico asignado.',
        ],
        normativeRef: 'Acuerdo 009 de 2024 · Capítulo IV (Ingreso, Permanencia y Certificación)',
        narrationText:
          'El Capítulo Cuarto regula el ciclo formativo: trámite de novedades como aplazamientos y traslados, prevención de deserción por ausencias injustificadas, y el registro periódico de bitácoras en las alternativas de etapa productiva.',
      },
      {
        id: 'reg-5',
        title: 'Capítulo V: Faltas, Medidas Formativas, Sanciones y Debido Proceso',
        kicker: 'Enfoque Formativo y Debido Proceso',
        summary:
          'Prioriza el enfoque formativo y restaurativo sobre el punitivo. Toda actuación respeta el debido proceso constitucional a través del Comité de Evaluación y Seguimiento.',
        keyPoints: [
          'Clasificación de faltas: Académicas y disciplinarias, graduadas en Leves, Graves y Gravísimas.',
          'Medidas formativas pedagógicas: Llamado de atención verbal y plan de mejoramiento académico o de convivencia.',
          'Sanciones tras debido proceso: Llamado de atención escrito con copia a hoja de vida, condicionamiento o cancelación de matrícula.',
          'Debido proceso: Notificación oportuna, derecho de defensa y descargos, término probatorio y recurso de reposición.',
        ],
        normativeRef: 'Acuerdo 009 de 2024 · Capítulo V (Régimen Sancionatorio y Medidas Formativas)',
        narrationText:
          'El Capítulo Quinto clasifica las faltas en leves, graves y gravísimas, dando prioridad a medidas formativas como planes de mejoramiento, y asegurando el debido proceso con derecho a descargos y recurso de reposición ante el Comité.',
      },
    ],
  },
  {
    id: 'normativa',
    number: '04',
    title: 'Procedimientos y Casos Prácticos',
    shortTitle: 'Debido Proceso',
    subtitle: 'Aplicación práctica de casos normativos, comités de evaluación y resolución de situaciones cotidianas.',
    durationMinutes: 15,
    imageUrl: '/src/assets/images/module_normativa_aprendiz_1794325215353.jpg',
    imageAlt: 'Aprendices estudiando casos prácticos de normativa en ambiente de formación',
    slides: [
      {
        id: 'nor-1',
        title: 'Derechos Fundamentales del Aprendiz',
        kicker: 'Reglamento del Aprendiz · Capítulo II',
        summary:
          'El Reglamento garantiza que todo aprendiz reciba formación profesional integral de calidad, trato digno, acceso a recursos tecnológicos y evaluación objetiva.',
        keyPoints: [
          'Recibir formación integral acorde con el programa y los diseños curriculares.',
          'Ser evaluado objetivamente y conocer oportunamente los resultados de aprendizaje.',
          'Acceder a servicios de Bienestar al Aprendiz, biblioteca y plataformas virtuales (Zajuna / SOFIA Plus).',
        ],
        normativeRef: 'Reglamento del Aprendiz SENA · Derechos',
        narrationText:
          'Como aprendiz tienes derecho a recibir formación profesional integral gratuita, ser tratado con respeto, conocer oportunamente tus evaluaciones y acceder a los servicios de bienestar y plataformas digitales.',
      },
      {
        id: 'nor-2',
        title: 'Deberes y Prohibiciones Esenciales',
        kicker: 'Reglamento del Aprendiz · Capítulos III y IV',
        summary:
          'El cumplimiento puntual de las actividades, el respeto a la propiedad intelectual y el cuidado del ambiente de formación son responsabilidades ineludibles.',
        keyPoints: [
          'Cumplir con todas las actividades de aprendizaje y justificar inasistencias dentro de los 3 días hábiles siguientes.',
          'Está prohibido el plagio, la suplantación de identidad y el porte de sustancias psicoactivas o armas.',
          'Portar el carné institucional y respetar los protocolos de seguridad y salud en el trabajo (SST).',
        ],
        normativeRef: 'Reglamento del Aprendiz SENA · Deberes y Prohibiciones',
        narrationText:
          'Entre tus deberes principales están asistir puntualmente, justificar ausencias máximo en tres días hábiles, evitar el plagio académico y portar siempre el carné institucional.',
      },
      {
        id: 'nor-3',
        title: 'Faltas, Medidas Formativas y Debido Proceso',
        kicker: 'Comité de Evaluación y Seguimiento',
        summary:
          'Las faltas se clasifican en académicas y disciplinarias (leves, graves y gravísimas). Toda actuación garantiza el derecho a la defensa y el debido proceso.',
        keyPoints: [
          'Medidas formativas: llamado de atención verbal, plan de mejoramiento académico o disciplinario.',
          'Sanciones: llamado de atención escrito, condicionamiento de matrícula o cancelación de matrícula.',
          'El Comité de Evaluación y Seguimiento analiza cada caso con participación del vocero de ficha.',
        ],
        normativeRef: 'Reglamento del Aprendiz SENA · Debido Proceso',
        narrationText:
          'Las faltas pueden ser académicas o disciplinarias y se califican en leves, graves o gravísimas. El Comité de Evaluación y Seguimiento garantiza siempre el debido proceso y el derecho a ser escuchado.',
      },
    ],
  },
  {
    id: 'bienestar',
    number: '05',
    title: 'Bienestar al Aprendiz y Ruta Formativa',
    shortTitle: 'Bienestar y Ruta',
    subtitle: 'Etapa lectiva, alternativas de etapa productiva, apoyos de sostenimiento y servicios de Bienestar.',
    durationMinutes: 15,
    imageUrl: '/src/assets/images/hero_sena_campus_1794325214676.jpg',
    imageAlt: 'Campus SENA con aprendices en actividades colaborativas y de bienestar',
    slides: [
      {
        id: 'bie-1',
        title: 'Etapa Lectiva y Etapa Productiva',
        kicker: 'Estructura de la Formación',
        summary:
          'La formación titulada en el SENA combina el desarrollo de competencias en el centro de formación (Etapa Lectiva) con la aplicación real en el sector productivo (Etapa Productiva).',
        keyPoints: [
          'Etapa Lectiva: desarrollo de competencias técnicas y transversales en ambientes SENA.',
          'Etapa Productiva: duración típica de 6 meses (864 horas) aplicando conocimientos en entorno real.',
          'Alternativas: Contrato de aprendizaje, vinculación laboral, pasantía, proyecto productivo o monitoría.',
        ],
        normativeRef: 'Guía de Desarrollo Curricular y Etapa Productiva SENA',
        narrationText:
          'Tu ruta formativa se divide en etapa lectiva y etapa productiva. En la etapa productiva puedes optar por contrato de aprendizaje, pasantía, vinculación laboral, proyecto productivo o monitoría.',
      },
      {
        id: 'bie-2',
        title: 'Plan de Bienestar al Aprendiz',
        kicker: 'Acompañamiento Integral',
        summary:
          'Bienestar al Aprendiz promueve el desarrollo humano integral, la permanencia y el éxito académico mediante salud, deporte, cultura, liderazgo y apoyos socioeconómicos.',
        keyPoints: [
          'Dimensiones: Salud y autocuidado, Arte y Cultura, Deporte y Recreación, Liderazgo y Consejería.',
          'Convocatorias de Apoyo de Sostenimiento Regular y FIC según disponibilidad y requisitos.',
          'Elección de Voceros de Ficha y Representantes de Aprendices ante la comunidad educativa.',
        ],
        normativeRef: 'Resolución Plan Nacional Integral de Bienestar al Aprendiz',
        narrationText:
          'Bienestar al Aprendiz acompaña tu permanencia en el SENA a través de deporte, cultura, consejería psicológica, liderazgo y convocatorias de apoyo de sostenimiento.',
      },
      {
        id: 'bie-3',
        title: 'Ecosistema Digital del Aprendiz',
        kicker: 'Herramientas Institucionales',
        summary:
          'El dominio de las plataformas institucionales facilita la gestión de certificados, evidencias de aprendizaje, calificaciones y búsqueda de contrato de aprendizaje.',
        keyPoints: [
          'SOFIA Plus: gestión de matrícula, novedades académicas, horarios y descarga de certificados.',
          'LMS Zajuna: ambiente virtual de aprendizaje para entrega de evidencias, foros y cuestionarios.',
          'SGVA (Sistema de Gestión Virtual de Aprendices) y Agencia Pública de Empleo (APE).',
        ],
        normativeRef: 'Ecosistema Tecnológico de Formación SENA',
        narrationText:
          'Durante tu formación utilizarás SOFIA Plus para trámites académicos y certificados, Zajuna como ambiente virtual de aprendizaje y el SGVA junto a la Agencia Pública de Empleo para tu etapa productiva.',
      },
    ],
  },
];

export const SYMBOL_HOTSPOTS: SymbolHotspot[] = [
  {
    id: 'pinon',
    name: 'El Piñón Dentado',
    sector: 'Sector Industria y Manufactura',
    meaning:
      'Representa el desarrollo industrial, la ingeniería, la transformación tecnológica y la fuerza productiva que impulsa la manufactura y la innovación técnica en Colombia.',
    usageRule: 'Forma la rueda exterior del escudo oficial; sus dientes simbolizan precisión y trabajo continuo.',
    coordinates: { x: 24, y: 24 },
  },
  {
    id: 'caduceo',
    name: 'El Caduceo',
    sector: 'Sector Comercio y Servicios',
    meaning:
      'Vara alada entrelazada por dos serpientes que simboliza el equilibrio, la ética en los intercambios comerciales, la logística, las finanzas y la prestación de servicios.',
    usageRule: 'Se ubica en la parte central superior del escudo como eje de dinamismo económico.',
    coordinates: { x: 50, y: 42 },
  },
  {
    id: 'cafe',
    name: 'El Ramo de Café',
    sector: 'Sector Primario y Extractivo',
    meaning:
      'Representa la riqueza agrícola, pecuaria, ambiental y minera del territorio colombiano, destacando al café como emblema del campo y la soberanía alimentaria.',
    usageRule: 'Enmarca la base interior del escudo junto al piñón, honrando las raíces rurales del país.',
    coordinates: { x: 75, y: 66 },
  },
  {
    id: 'logosimbolo',
    name: 'El Logosímbolo SENA',
    sector: 'Identidad del Aprendiz y Proyecto de Vida',
    meaning:
      'Muestra de manera estilizada una figura humana (el aprendiz) abriendo caminos hacia el horizonte. Representa los senderos del conocimiento y el progreso.',
    usageRule: 'Debe usarse en verde institucional (#39A900), negro o blanco sobre fondos contrastantes, respetando su área de reserva.',
    coordinates: { x: 50, y: 82 },
  },
];

export const ANTHEM_SECTIONS: AnthemSection[] = [
  {
    id: 'coro-1',
    label: 'Coro',
    startSec: 0,
    endSec: 16,
    lines: [
      'Estudiantes del SENA adelante,',
      'por Colombia luchad con amor,',
      'con el ánimo noble y radiante,',
      'transformémosla en mundo mejor.',
    ],
  },
  {
    id: 'estrofa-1',
    label: 'Estrofa I',
    startSec: 16,
    endSec: 32,
    lines: [
      'De la patria el futuro destino,',
      'en las manos del joven está,',
      'el trabajo es seguro camino,',
      'que el progreso a Colombia dará.',
    ],
  },
  {
    id: 'estrofa-2',
    label: 'Estrofa II',
    startSec: 32,
    endSec: 48,
    lines: [
      'En la forja del SENA se forman,',
      'hombres libres que anhelan triunfar,',
      'con la ciencia y la técnica unidas,',
      'nuevos rumbos de paz trazarán.',
    ],
  },
  {
    id: 'estrofa-3',
    label: 'Estrofa III',
    startSec: 48,
    endSec: 64,
    lines: [
      'Hoy la patria nos grita sentida,',
      '¡estudiantes del SENA triunfad!',
      'solo así lograréis en la vida,',
      'más justicia, mayor libertad.',
    ],
  },
];

export const REGULATION_SCENARIOS: RegulationScenario[] = [
  {
    id: 'scen-1',
    title: 'Inasistencia por calamidad doméstica',
    context:
      'Camila, aprendiz de etapa lectiva, no pudo asistir dos días seguidos a formación por una urgencia médica familiar debidamente soportada.',
    question: '¿Cuál es el procedimiento correcto según el Reglamento del Aprendiz?',
    choices: [
      {
        label: 'Presentar la excusa soportada dentro de los 3 días hábiles siguientes ante el instructor o coordinación.',
        isCorrect: true,
        feedback:
          'Correcto. El Reglamento establece un plazo de hasta tres (3) días hábiles siguientes a la ausencia para presentar los soportes válidos y evitar el registro de deserción.',
        article: 'Reglamento del Aprendiz · Capítulo III (Deberes y Deserción)',
      },
      {
        label: 'Esperar hasta el final del trimestre para entregar todas las incapacidades juntas.',
        isCorrect: false,
        feedback:
          'Incorrecto. Acumular inasistencias sin justificar oportunamente puede activar el proceso de deserción tras tres días consecutivos o cinco no consecutivos sin soporte.',
        article: 'Reglamento del Aprendiz · Control de Asistencia',
      },
      {
        label: 'No avisar si un compañero toma apuntes por ella.',
        isCorrect: false,
        feedback:
          'Incorrecto. La asistencia a las sesiones presenciales o sincrónicas es un deber del aprendiz y debe justificarse formalmente.',
        article: 'Reglamento del Aprendiz · Deberes del Aprendiz',
      },
    ],
  },
  {
    id: 'scen-2',
    title: 'Entrega de evidencia en plataforma Zajuna',
    context:
      'Un aprendiz encuentra en internet un proyecto exactamente igual al solicitado en la guía de aprendizaje y decide cambiarle únicamente el nombre en la portada.',
    question: '¿Cómo clasifica la normativa SENA esta acción?',
    choices: [
      {
        label: 'Es una falta disciplinaria y académica grave por plagio y fraude académico.',
        isCorrect: true,
        feedback:
          'Correcto. Presentar como propio el trabajo de otros viola los derechos de autor y constituye una falta grave en el Reglamento del Aprendiz, sujeta a Comité de Evaluación.',
        article: 'Reglamento del Aprendiz · Prohibiciones (Plagio)',
      },
      {
        label: 'Es válido siempre que el aprendiz entienda cómo funciona el archivo.',
        isCorrect: false,
        feedback:
          'Incorrecto. La apropiación indebida de autoría sin citación ni desarrollo propio constituye plagio y atenta contra el Código de Integridad.',
        article: 'Código de Integridad y Reglamento del Aprendiz',
      },
    ],
  },
  {
    id: 'scen-3',
    title: 'Uso de la imagen institucional en redes sociales',
    context:
      'Un grupo de aprendices crea una página para vender productos personales y decide usar el logosímbolo verde del SENA como sello de garantía comercial.',
    question: '¿Está permitido este uso del logosímbolo institucional?',
    choices: [
      {
        label: 'No. El logosímbolo SENA es de uso exclusivo institucional y no puede emplearse con fines comerciales privados.',
        isCorrect: true,
        feedback:
          'Correcto. El Manual de Identidad Corporativa prohíbe usar la marca SENA en iniciativas particulares con ánimo de lucro sin autorización expresa de la Dirección General.',
        article: 'Manual de Identidad Visual SENA · Uso de Marca',
      },
      {
        label: 'Sí, porque son aprendices activos y están emprendiendo.',
        isCorrect: false,
        feedback:
          'Incorrecto. Aunque el SENA fomenta el emprendimiento (Fondo Emprender), los emprendimientos privados deben desarrollar su propia marca y no utilizar el logosímbolo oficial.',
        article: 'Manual de Identidad Visual SENA',
      },
    ],
  },
];

export const ACUERDO_009_ARTICLES: AcuerdoArticle[] = [
  {
    chapter: 'Disposiciones Preliminares',
    article: 'Artículo 2',
    title: 'Alcance del Reglamento',
    category: 'principios',
    summary:
      'Aplica para aspirantes durante su proceso de selección e ingreso, y aprendices matriculados en cualquier nivel (técnico, tecnólogo, operario, auxiliar), modalidad (presencial, virtual o a distancia), jornada y Centro de Formación.',
    keyTakeaway: 'Universalidad: Cobija a todos los aprendices del país tanto en sedes físicas como en plataformas virtuales (Zajuna).',
  },
  {
    chapter: 'Disposiciones Preliminares',
    article: 'Artículo 3',
    title: 'Principios Orientadores',
    category: 'principios',
    summary:
      'Incorpora principios fundamentales como la dignidad humana, el desarrollo sostenible, el enfoque diferencial, la inclusión social, la solidaridad, la territorialidad, la honestidad y la justicia restaurativa.',
    keyTakeaway: 'Humanismo pedagógico: Enfoque formativo y restaurativo que protege la diversidad y la convivencia pacífica.',
  },
  {
    chapter: 'Capítulo I: Definiciones',
    article: 'Artículo 5',
    title: 'Formación Profesional Integral y Aprendiz SENA',
    category: 'principios',
    summary:
      'Proceso educativo teórico-práctico de carácter gratuito orientado al desarrollo de conocimientos técnicos, tecnológicos y de actitudes y valores para la convivencia social y productiva.',
    keyTakeaway: 'El aprendiz es el protagonista de su aprendizaje autónomo, colaborativo y ético.',
  },
  {
    chapter: 'Capítulo II: Derechos del Aprendiz',
    article: 'Artículo 7',
    title: 'Garantías y Derechos Fundamentales',
    category: 'derechos',
    summary:
      'Derecho a recibir formación integral de calidad, trato digno sin discriminación, uso de infraestructura y tecnologías, evaluación objetiva, y acceso a servicios de salud ocupacional y bienestar.',
    keyTakeaway: 'Educación digna, inclusiva y con acompañamiento psicosocial permanente.',
  },
  {
    chapter: 'Capítulo II: Derechos del Aprendiz',
    article: 'Artículo 8',
    title: 'Representatividad y Participación Democrática',
    category: 'derechos',
    summary:
      'Derecho a postularse, elegir y ser elegido vocero de ficha o representante de los aprendices ante el Centro de Formación, participando en comités y escenarios de diálogo.',
    keyTakeaway: 'Voz activa en la toma de decisiones y representación en el Comité de Evaluación y Seguimiento.',
  },
  {
    chapter: 'Capítulo III: Deberes del Aprendiz',
    article: 'Artículo 9',
    title: 'Deberes Académicos y de Convivencia',
    category: 'deberes',
    summary:
      'Asistir puntualmente, justificar inasistencias en máximo 3 días hábiles siguientes al hecho con soporte válido, respetar derechos de autor y portar el carné institucional en todo momento.',
    keyTakeaway: 'Compromiso formativo: Cumplir con las evidencias y justificar ausencias a tiempo.',
  },
  {
    chapter: 'Capítulo III: Deberes y Prohibiciones',
    article: 'Artículo 10',
    title: 'Prohibiciones Expresas',
    category: 'deberes',
    summary:
      'Prohibido el plagio o fraude en evidencias, suplantación de identidad en evaluaciones, porte de armas, consumo o porte de sustancias psicoactivas, y el uso comercial no autorizado de la marca SENA.',
    keyTakeaway: 'Tolerancia cero con el fraude académico, la violencia y la falsificación.',
  },
  {
    chapter: 'Capítulo IV: Ingreso, Permanencia y Certificación',
    article: 'Artículo 14',
    title: 'Novedades de Matrícula (Traslado, Aplazamiento y Retiro)',
    category: 'novedades',
    summary:
      'Los aprendices pueden solicitar traslado de Centro o Programa tras completar un periodo académico, aplazamiento debidamente justificado hasta por 1 año, o retiro voluntario formal.',
    keyTakeaway: 'Flexibilidad regulada: Los trámites se radican en SOFIA Plus con visto bueno de coordinación.',
  },
  {
    chapter: 'Capítulo IV: Ingreso, Permanencia y Certificación',
    article: 'Artículo 16',
    title: 'Causales de Deserción',
    category: 'novedades',
    summary:
      'Se configura deserción cuando el aprendiz acumula 3 días consecutivos de inasistencia injustificada, o no registra alternativas de etapa productiva en los plazos fijados por la institución.',
    keyTakeaway: 'Prevención temprana: Justificar oportunamente para evitar la cancelación de matrícula por deserción.',
  },
  {
    chapter: 'Capítulo IV: Ingreso, Permanencia y Certificación',
    article: 'Artículo 18',
    title: 'Modalidades de Etapa Productiva',
    category: 'novedades',
    summary:
      'Habilita alternativas como Contrato de Aprendizaje, Vinculación Laboral, Proyecto Productivo, Pasantía Institucional y Monitorías, con registro periódico obligatorio de bitácoras.',
    keyTakeaway: 'Aplicación real de competencias con seguimiento quincenal o mensual del instructor.',
  },
  {
    chapter: 'Capítulo V: Faltas, Medidas Formativas y Sanciones',
    article: 'Artículo 21',
    title: 'Clasificación y Criterios de Faltas',
    category: 'faltas',
    summary:
      'Las faltas son académicas (incumplimiento en evidencias o resultados) o disciplinarias (atentados contra la convivencia y la ética), graduadas en Leves, Graves y Gravísimas.',
    keyTakeaway: 'Proporcionalidad: Se analiza intencionalidad, reiteración y perjuicio causado.',
  },
  {
    chapter: 'Capítulo V: Faltas, Medidas Formativas y Sanciones',
    article: 'Artículo 23',
    title: 'Medidas Formativas Pedagógicas',
    category: 'faltas',
    summary:
      'Acciones pedagógicas preventivas sin carácter de sanción formal: Llamado de atención verbal y Plan de Mejoramiento Formativo concertado con plazo máximo de cumplimiento.',
    keyTakeaway: 'Oportunidad de aprendizaje: Se busca orientar al estudiante antes de escalar a sanciones.',
  },
  {
    chapter: 'Capítulo V: Faltas, Medidas Formativas y Sanciones',
    article: 'Artículo 25',
    title: 'Sanciones Disciplinarias',
    category: 'faltas',
    summary:
      'Aplicables únicamente tras agotar el debido proceso: Llamado de atención escrito con copia a hoja de vida, Condicionamiento de matrícula y Cancelación definitiva de matrícula.',
    keyTakeaway: 'Sanciones regladas dictadas mediante acto administrativo formal del Subdirector de Centro.',
  },
  {
    chapter: 'Capítulo V: Faltas, Medidas Formativas y Sanciones',
    article: 'Artículo 28',
    title: 'Garantía del Debido Proceso Constitucional',
    category: 'debido-proceso',
    summary:
      'El Comité de Evaluación y Seguimiento garantiza notificación formal, formulación clara de cargos, término de 3 días para descargos, aporte de pruebas y recurso de reposición.',
    keyTakeaway: 'Derecho a la defensa: Ningún aprendiz puede ser sancionado sin ser escuchado en comité.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Módulo 1: Identidad e Imagen Institucional
  {
    id: 'q-id-1',
    moduleId: 'identidad',
    type: 'multiple',
    prompt: '¿En qué año fue fundado el SENA y quién fue su principal impulsor?',
    options: [
      '1957, impulsado por Rodolfo Martínez Tono',
      '1968, impulsado por Carlos Lleras Restrepo',
      '1948, impulsado por Jorge Eliécer Gaitán',
      '1974, impulsado por Alfonso López Michelsen',
    ],
    correctIndex: 0,
    explanation:
      'El SENA fue creado el 21 de junio de 1957 mediante el Decreto Ley 118, gracias a la visión de Rodolfo Martínez Tono.',
    reference: 'Decreto Ley 118 de 1957',
  },
  {
    id: 'q-id-2',
    moduleId: 'identidad',
    type: 'multiple',
    prompt: 'Según el Manual de Identidad Visual, ¿qué práctica está estrictamente prohibida respecto al logosímbolo del SENA?',
    options: [
      'Usarlo sobre fondo blanco institucional',
      'Deformar sus proporciones, rotarlo o cambiar su color verde oficial',
      'Incluirlo en presentaciones académicas de proyecto formativo',
      'Respetar el área de reserva alrededor del símbolo',
    ],
    correctIndex: 1,
    explanation:
      'La integridad visual de la marca exige mantener intactas las proporciones, orientación y paleta oficial (#39A900, blanco o negro según fondo).',
    reference: 'Manual de Identidad Corporativa SENA',
  },
  {
    id: 'q-id-3',
    moduleId: 'identidad',
    type: 'boolean',
    prompt: '¿El servicio de formación profesional integral que ofrece el SENA a los colombianos tiene algún costo de matrícula o mensualidad?',
    options: ['Falso, la formación en el SENA es totalmente gratuita', 'Verdadero, se cobra un porcentaje según estrato'],
    correctIndex: 0,
    explanation:
      'Todos los programas de formación titulada y complementaria del SENA son gratuitos y de acceso público sin intermediarios.',
    reference: 'Ley 119 de 1994',
  },
  {
    id: 'q-id-4',
    moduleId: 'identidad',
    type: 'multiple',
    prompt: '¿Cuál de los siguientes grupos corresponde a los valores del Código de Integridad SENA?',
    options: [
      'Competitividad, rapidez y exclusividad',
      'Honestidad, Respeto, Compromiso, Diligencia y Justicia',
      'Jerarquía, silencio y obediencia',
      'Lucro, productividad y reserva',
    ],
    correctIndex: 1,
    explanation:
      'El Código de Integridad del SENA adopta cinco valores esenciales: Honestidad, Respeto, Compromiso, Diligencia y Justicia.',
    reference: 'Código de Integridad SENA',
  },

  // Módulo 2: Símbolos Institucionales e Himno
  {
    id: 'q-sim-1',
    moduleId: 'simbolos',
    type: 'multiple',
    prompt: 'En el Escudo del SENA, ¿qué sector económico representa el Caduceo?',
    options: [
      'El sector primario y agropecuario',
      'El sector industria y manufactura',
      'El sector comercio y servicios',
      'El sector minero y energético',
    ],
    correctIndex: 2,
    explanation:
      'El Caduceo (vara alada con dos serpientes) simboliza el sector Comercio y Servicios; el Piñón representa la Industria y el Café al sector Primario.',
    reference: 'Símbolos Institucionales SENA',
  },
  {
    id: 'q-sim-2',
    moduleId: 'simbolos',
    type: 'multiple',
    prompt: '¿Qué simboliza el fondo blanco de la Bandera del SENA?',
    options: [
      'La neutralidad tecnológica',
      'La paz, la tranquilidad y la libertad de pensamiento',
      'La nieve de los nevados colombianos',
      'La ausencia de normas disciplinarias',
    ],
    correctIndex: 1,
    explanation:
      'La bandera blanca con el escudo en el centro representa la paz, la transparencia institucional y el compromiso con la convivencia.',
    reference: 'Protocolo de Símbolos SENA',
  },
  {
    id: 'q-sim-3',
    moduleId: 'simbolos',
    type: 'multiple',
    prompt: '¿Qué representa el Logosímbolo del SENA (la figura estilizada)?',
    options: [
      'Una antena de telecomunicaciones',
      'Los tres senderos que el aprendiz recorre hacia su proyecto de vida',
      'Una hoja de palma de cera',
      'Un compás de arquitectura antigua',
    ],
    correctIndex: 1,
    explanation:
      'El logosímbolo sintetiza la figura del aprendiz avanzando por los caminos del conocimiento y la formación hacia su realización personal y laboral.',
    reference: 'Manual de Identidad Visual SENA',
  },
  {
    id: 'q-sim-4',
    moduleId: 'simbolos',
    type: 'boolean',
    prompt: 'En el Escudo del SENA, el ramo de café simboliza el sector primario y extractivo de la economía colombiana.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation:
      'Correcto. El ramo de café honra al sector agropecuario, primario y extractivo dentro de los tres sectores representados en el escudo.',
    reference: 'Heráldica Institucional SENA',
  },

  // Módulo 3: Reglamento del Aprendiz (Acuerdo 009 de 2024)
  {
    id: 'q-reg-1',
    moduleId: 'reglamento',
    type: 'multiple',
    prompt: '¿Cuál es la norma vigente expedida por el Consejo Directivo Nacional que adoptó el nuevo Reglamento del Aprendiz SENA?',
    options: [
      'Acuerdo 009 de 2024',
      'Acuerdo 07 de 2012',
      'Decreto 118 de 1957',
      'Resolución 106 de 2018',
    ],
    correctIndex: 0,
    explanation:
      'El Acuerdo 009 de 2024 adoptó el nuevo Reglamento del Aprendiz SENA, derogando formalmente el anterior Acuerdo 07 de 2012 y normas modificatorias.',
    reference: 'Acuerdo 009 de 2024 · Consejo Directivo Nacional',
  },
  {
    id: 'q-reg-2',
    moduleId: 'reglamento',
    type: 'multiple',
    prompt: '¿Cuáles de los siguientes principios orientadores fueron expresamente consagrados en el Acuerdo 009 de 2024?',
    options: [
      'Dignidad humana, inclusión, desarrollo sostenible y enfoque diferencial',
      'Exclusión por estrato socioeconómico y jerarquía punitiva',
      'Cobro de mensualidades según la región del país',
      'Competencia individualista y silencio administrativo',
    ],
    correctIndex: 0,
    explanation:
      'El Artículo 3 del Acuerdo 009 de 2024 incorpora la dignidad humana, la inclusión, el desarrollo sostenible, el enfoque diferencial y la solidaridad.',
    reference: 'Acuerdo 009 de 2024 · Artículo 3 (Principios Orientadores)',
  },
  {
    id: 'q-reg-3',
    moduleId: 'reglamento',
    type: 'multiple',
    prompt: 'Bajo el Acuerdo 009 de 2024, ¿cuál es la diferencia principal entre una medida formativa y una sanción disciplinaria?',
    options: [
      'Las medidas formativas son pedagógicas y preventivas (llamados verbales o planes de mejoramiento); las sanciones se aplican tras debido proceso (llamado escrito o cancelación de matrícula)',
      'No existe diferencia, ambas implican la pérdida inmediata de la condición de aprendiz',
      'Las medidas formativas conllevan multas económicas y las sanciones no',
      'Las sanciones las determinan los aprendices y las formativas la vigilancia',
    ],
    correctIndex: 0,
    explanation:
      'El Acuerdo 009 de 2024 prioriza un enfoque formativo y restaurativo: las medidas formativas son pedagógicas, mientras las sanciones son resultado de un debido proceso formal.',
    reference: 'Acuerdo 009 de 2024 · Capítulo V',
  },
  {
    id: 'q-reg-4',
    moduleId: 'reglamento',
    type: 'case',
    prompt: 'Si un aprendiz es citado ante el Comité de Evaluación y Seguimiento por una presunta falta grave, ¿qué garantías le otorga el debido proceso según el Acuerdo 009 de 2024?',
    options: [
      'Derecho a ser notificado formalmente, conocer los cargos, aportar pruebas, presentar descargos y ejercer el recurso de reposición',
      'Cancelación automática de matrícula sin derecho a ser escuchado',
      'Obligación de declararse culpable sin revisar evidencias',
      'Pérdida de la condición de aprendiz por votación no sustentada',
    ],
    correctIndex: 0,
    explanation:
      'El debido proceso garantiza la presunción de inocencia, formulación clara de cargos, término probatorio para descargos y derecho a reposición ante el Subdirector de Centro.',
    reference: 'Acuerdo 009 de 2024 · Capítulo V (Debido Proceso)',
  },

  // Módulo 4: Procedimientos y Casos Prácticos (Normativa)
  {
    id: 'q-nor-1',
    moduleId: 'normativa',
    type: 'case',
    prompt: 'Si un aprendiz falta a formación por incapacidad médica, ¿cuántos días hábiles tiene como plazo máximo para presentar la justificación?',
    options: [
      '1 día hábil',
      '3 días hábiles siguientes a la inasistencia',
      '15 días calendario',
      'Al finalizar el trimestre académico',
    ],
    correctIndex: 1,
    explanation:
      'El Reglamento del Aprendiz establece un plazo máximo de tres (3) días hábiles para reportar y soportar debidamente una inasistencia.',
    reference: 'Reglamento del Aprendiz · Control de Asistencia',
  },
  {
    id: 'q-nor-2',
    moduleId: 'normativa',
    type: 'multiple',
    prompt: '¿Qué instancia institucional analiza las faltas académicas o disciplinarias graves garantizando el debido proceso del aprendiz?',
    options: [
      'La Junta Directiva Nacional',
      'El Comité de Evaluación y Seguimiento',
      'El departamento de seguridad física',
      'Los compañeros de ficha por votación simple',
    ],
    correctIndex: 1,
    explanation:
      'El Comité de Evaluación y Seguimiento es la instancia encargada de analizar casos académicos y disciplinarios respetando el debido proceso.',
    reference: 'Reglamento del Aprendiz · Debido Proceso',
  },
  {
    id: 'q-nor-3',
    moduleId: 'normativa',
    type: 'boolean',
    prompt: 'Conocer oportunamente los resultados de las evaluaciones y solicitar su revisión respetuosa es un derecho del aprendiz SENA.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation:
      'Todo aprendiz tiene derecho a recibir evaluación objetiva, conocer sus juicios evaluativos (Aprobado / Por Evaluar) y solicitar revisión si lo considera necesario.',
    reference: 'Reglamento del Aprendiz · Capítulo II',
  },
  {
    id: 'q-nor-4',
    moduleId: 'normativa',
    type: 'multiple',
    prompt: '¿Cuál de las siguientes situaciones constituye una falta disciplinaria grave según el Reglamento?',
    options: [
      'Participar activamente en un foro de Zajuna',
      'Cometer plagio en evidencias de aprendizaje o suplantar identidad',
      'Solicitar asesoría al instructor sobre una guía',
      'Postularse como vocero de ficha',
    ],
    correctIndex: 1,
    explanation:
      'El plagio, fraude académico o suplantación vulneran las prohibiciones del Reglamento del Aprendiz y conllevan proceso disciplinario.',
    reference: 'Reglamento del Aprendiz · Prohibiciones',
  },

  // Módulo 4: Bienestar al Aprendiz y Ruta Formativa
  {
    id: 'q-bie-1',
    moduleId: 'bienestar',
    type: 'multiple',
    prompt: '¿Cuál es la duración estándar de la Etapa Productiva en programas de formación titulada?',
    options: [
      '1 mes (160 horas)',
      '6 meses (864 horas)',
      '12 meses (1.920 horas)',
      '2 semanas de observación',
    ],
    correctIndex: 1,
    explanation:
      'La Etapa Productiva tiene una duración general de 6 meses (864 horas), durante los cuales el aprendiz aplica sus competencias en un entorno laboral real.',
    reference: 'Reglamento y Guía de Etapa Productiva SENA',
  },
  {
    id: 'q-bie-2',
    moduleId: 'bienestar',
    type: 'multiple',
    prompt: '¿Cuál de las siguientes NO es una alternativa válida para desarrollar la Etapa Productiva?',
    options: [
      'Contrato de aprendizaje',
      'Proyecto productivo o pasantía',
      'Vinculación laboral relacionada con el programa',
      'Presentar únicamente un examen teórico sin práctica',
    ],
    correctIndex: 3,
    explanation:
      'La etapa productiva exige aplicación práctica real mediante contrato de aprendizaje, vinculación laboral, pasantía, proyecto productivo o monitoría.',
    reference: 'Alternativas de Etapa Productiva SENA',
  },
  {
    id: 'q-bie-3',
    moduleId: 'bienestar',
    type: 'multiple',
    prompt: '¿Qué plataforma utiliza el SENA como Ambiente Virtual de Aprendizaje (LMS) para entregar evidencias y actividades?',
    options: [
      'Zajuna',
      'SICOP',
      'RUNT',
      'SECOP II',
    ],
    correctIndex: 0,
    explanation:
      'Zajuna es el LMS oficial del SENA donde los aprendices interactúan con guías, foros y evidencias, complementado con SOFIA Plus para gestión académica.',
    reference: 'Ecosistema Digital SENA',
  },
  {
    id: 'q-bie-4',
    moduleId: 'bienestar',
    type: 'boolean',
    prompt: 'Bienestar al Aprendiz ofrece acompañamiento en salud, deporte, cultura, liderazgo y convocatorias de apoyo de sostenimiento.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    explanation:
      'Correcto. El Plan Nacional Integral de Bienestar al Aprendiz busca fortalecer la permanencia y formación integral del aprendiz.',
    reference: 'Plan Integral de Bienestar al Aprendiz',
  },
];

export const INITIAL_APPRENTICE_PROGRESS: InductionProgressMap = {
  identidad: {
    multimediaCompleted: true,
    slidesViewed: ['id-1', 'id-2', 'id-3'],
    quizScore: 100,
    quizAttempts: 1,
    completedAt: '2026-11-09',
  },
  simbolos: {
    multimediaCompleted: false,
    slidesViewed: ['sim-1'],
    quizScore: null,
    quizAttempts: 0,
    completedAt: null,
  },
  reglamento: {
    multimediaCompleted: false,
    slidesViewed: [],
    quizScore: null,
    quizAttempts: 0,
    completedAt: null,
  },
  normativa: {
    multimediaCompleted: false,
    slidesViewed: [],
    quizScore: null,
    quizAttempts: 0,
    completedAt: null,
  },
  bienestar: {
    multimediaCompleted: false,
    slidesViewed: [],
    quizScore: null,
    quizAttempts: 0,
    completedAt: null,
  },
};

export const COHORT_APPRENTICES: ApprenticeRecord[] = [
  {
    id: 'apr-1',
    name: 'Valentina Restrepo Gómez',
    documentId: 'CC 1.036.942.118',
    email: 'v.restrepo@soy.sena.edu.co',
    ficha: '3409041',
    program: 'Gestión empresarial',
    progress: {
      identidad: { completed: true, score: 100 },
      simbolos: { completed: true, score: 100 },
      reglamento: { completed: true, score: 100 },
      normativa: { completed: true, score: 75 },
      bienestar: { completed: true, score: 100 },
    },
    attendanceVerified: true,
    lastActivity: 'Hoy, 08:15',
    instructorNote: 'Inducción completada con excelencia.',
  },
  {
    id: 'apr-2',
    name: 'Mateo Londoño Zapata',
    documentId: 'TI 1.001.482.930',
    email: 'm.londono@soy.sena.edu.co',
    ficha: '3409041',
    program: 'Gestión empresarial',
    progress: {
      identidad: { completed: true, score: 100 },
      simbolos: { completed: true, score: 75 },
      reglamento: { completed: false, score: null },
      normativa: { completed: false, score: null },
      bienestar: { completed: false, score: null },
    },
    attendanceVerified: true,
    lastActivity: 'Ayer, 16:40',
    instructorNote: 'Pendiente cuestionario de Acuerdo 009 de 2024.',
  },
  {
    id: 'apr-3',
    name: 'Mariana Cárdenas Ospina',
    documentId: 'CC 1.017.294.502',
    email: 'm.cardenas@soy.sena.edu.co',
    ficha: '3409041',
    program: 'Gestión empresarial',
    progress: {
      identidad: { completed: true, score: 100 },
      simbolos: { completed: true, score: 100 },
      reglamento: { completed: true, score: 100 },
      normativa: { completed: true, score: 100 },
      bienestar: { completed: true, score: 75 },
    },
    attendanceVerified: true,
    lastActivity: 'Hoy, 07:50',
  },
  {
    id: 'apr-4',
    name: 'Juan Pablo Henao Mejía',
    documentId: 'CC 1.020.483.719',
    email: 'jp.henao@soy.sena.edu.co',
    ficha: '3409041',
    program: 'Gestión empresarial',
    progress: {
      identidad: { completed: true, score: 75 },
      simbolos: { completed: false, score: null },
      reglamento: { completed: false, score: null },
      normativa: { completed: false, score: null },
      bienestar: { completed: false, score: null },
    },
    attendanceVerified: false,
    lastActivity: 'Hace 2 días',
    instructorNote: 'Verificar ingreso a plataforma y asistencia.',
  },
  {
    id: 'apr-5',
    name: 'Sofía Quintero Arango',
    documentId: 'TI 1.035.812.640',
    email: 's.quintero@soy.sena.edu.co',
    ficha: '3409041',
    program: 'Gestión empresarial',
    progress: {
      identidad: { completed: true, score: 100 },
      simbolos: { completed: true, score: 100 },
      reglamento: { completed: true, score: 100 },
      normativa: { completed: true, score: 100 },
      bienestar: { completed: false, score: null },
    },
    attendanceVerified: true,
    lastActivity: 'Hoy, 09:05',
  },
  {
    id: 'apr-6',
    name: 'Andrés Felipe Morales',
    documentId: 'CC 1.007.319.845',
    email: 'af.morales@soy.sena.edu.co',
    ficha: '3409041',
    program: 'Gestión empresarial',
    progress: {
      identidad: { completed: false, score: null },
      simbolos: { completed: false, score: null },
      reglamento: { completed: false, score: null },
      normativa: { completed: false, score: null },
      bienestar: { completed: false, score: null },
    },
    attendanceVerified: false,
    lastActivity: 'Sin ingreso',
    instructorNote: 'Contactar para inicio de inducción.',
  },
];
