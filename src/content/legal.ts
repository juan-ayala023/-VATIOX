/**
 * Contenido legal PLACEHOLDER. BORRADOR — PENDIENTE DE REVISIÓN LEGAL.
 * Debe ser redactado/validado por un abogado antes de publicar.
 */
import type { LegalSection } from '@/components/legal/LegalDoc';

const PH = '[Texto pendiente de redacción legal.]';
const COMPANY = '[RAZÓN SOCIAL S.A.S.]';
const NIT = '[NIT 000.000.000-0]';
const EMAIL = '[correo@vatiox.co]';
const ADDRESS = '[Dirección, ciudad]';

export const LEGAL_UPDATED = '[DD/MM/2026]';

export const termsSections: LegalSection[] = [
  { id: 'identificacion', title: 'Identificación del vendedor', paragraphs: [`${COMPANY}, identificada con ${NIT}, domiciliada en ${ADDRESS}, correo ${EMAIL}, es la responsable de la tienda en línea VATIOX.`] },
  { id: 'objeto', title: 'Objeto y aceptación', paragraphs: ['Estos términos regulan el uso del sitio y la compra de productos a través de él.', PH] },
  { id: 'productos', title: 'Productos e información', paragraphs: ['La información de cada producto (contenido, porción, registro sanitario) corresponde a la etiqueta aprobada.', PH] },
  { id: 'precios', title: 'Precios y medios de pago', paragraphs: ['Los precios se expresan en pesos colombianos (COP) e incluyen IVA. Medios de pago: PSE, tarjetas débito y crédito, Nequi y Daviplata, procesados por una pasarela de pagos autorizada.', PH] },
  { id: 'envios', title: 'Envíos', paragraphs: ['El envío es gratis a todo Colombia en las ofertas indicadas. Los tiempos de entrega se informan con la guía de envío.', PH] },
  { id: 'garantia', title: 'Garantía legal (Ley 1480 de 2011)', paragraphs: ['El consumidor tiene derecho a la garantía legal de calidad, idoneidad y seguridad del producto, en los términos del Estatuto del Consumidor.', PH] },
  { id: 'retracto', title: 'Derecho de retracto', paragraphs: ['En ventas a distancia, el consumidor puede ejercer el derecho de retracto dentro de los 5 días hábiles siguientes a la entrega del producto (art. 47, Ley 1480 de 2011). Ver la política de envíos, cambios, devoluciones y retracto.'] },
  { id: 'reversion', title: 'Reversión del pago', paragraphs: ['El consumidor puede solicitar la reversión del pago en los casos previstos en el art. 51 de la Ley 1480 de 2011 y el Decreto 1074 de 2015.', PH] },
  { id: 'datos', title: 'Datos personales', paragraphs: ['El tratamiento de datos personales se rige por la Política de Tratamiento de Datos Personales publicada en este sitio (Ley 1581 de 2012).'] },
  { id: 'pqr', title: 'Peticiones, quejas y reclamos', paragraphs: [`Canal de atención: ${EMAIL} y WhatsApp.`, PH] },
  { id: 'ley', title: 'Ley aplicable', paragraphs: ['Estos términos se rigen por las leyes de la República de Colombia.', PH] },
];

export const privacySections: LegalSection[] = [
  { id: 'responsable', title: 'Responsable del tratamiento', paragraphs: [`${COMPANY}, ${NIT}, domicilio ${ADDRESS}, correo ${EMAIL}.`] },
  { id: 'marco', title: 'Marco legal', paragraphs: ['Ley Estatutaria 1581 de 2012, Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015) y demás normas concordantes.'] },
  { id: 'datos', title: 'Datos que recolectamos', paragraphs: ['Datos de identificación y contacto suministrados por el titular:'], items: ['Nombre y cédula', 'Correo electrónico y número de WhatsApp', 'Dirección, barrio, ciudad y departamento de entrega', 'Disciplina deportiva (lista de espera, opcional)'] },
  { id: 'finalidades', title: 'Finalidades', paragraphs: ['Los datos se tratan para:'], items: ['Procesar, facturar y entregar pedidos', 'Enviar confirmaciones y actualizaciones de envío por WhatsApp y correo', 'Gestionar la lista de espera y avisos de lanzamiento', 'Atender peticiones, quejas y reclamos', 'Enviar información comercial, solo con autorización previa', PH] },
  { id: 'derechos', title: 'Derechos del titular', paragraphs: ['Como titular tienes derecho a:'], items: ['Conocer, actualizar y rectificar tus datos', 'Solicitar prueba de la autorización otorgada', 'Ser informado sobre el uso dado a tus datos', 'Presentar quejas ante la Superintendencia de Industria y Comercio', 'Revocar la autorización y/o solicitar la supresión de tus datos', 'Acceder gratuitamente a tus datos'] },
  { id: 'canal', title: 'Canal de consultas y reclamos', paragraphs: [`Consultas y reclamos: ${EMAIL}. Las consultas se atienden en máximo 10 días hábiles y los reclamos en máximo 15 días hábiles, según la Ley 1581 de 2012.`, PH] },
  { id: 'seguridad', title: 'Medidas de seguridad', paragraphs: [PH] },
  { id: 'transferencia', title: 'Encargados y transferencias', paragraphs: ['Proveedores que pueden tratar datos como encargados: pasarela de pagos, transportadora, facturación electrónica, mensajería.', PH] },
  { id: 'vigencia', title: 'Vigencia', paragraphs: [PH] },
];

export const shippingSections: LegalSection[] = [
  { id: 'cobertura', title: 'Cobertura y costo de envío', paragraphs: ['Envío gratis a todo Colombia en las ofertas publicadas.', PH] },
  { id: 'tiempos', title: 'Tiempos de envío', paragraphs: ['[X] a [Y] días hábiles en ciudades principales y [X] a [Y] días hábiles en otros municipios, contados desde la confirmación del pago.', PH] },
  { id: 'rastreo', title: 'Rastreo', paragraphs: ['Recibirás la guía por WhatsApp y correo. También puedes consultar el estado en la página Rastrear pedido.'] },
  { id: 'retracto', title: 'Derecho de retracto (5 días hábiles)', paragraphs: ['En compras a distancia puedes retractarte dentro de los 5 días hábiles siguientes a la entrega, sin justificar el motivo (art. 47, Ley 1480 de 2011). El producto debe devolverse en las mismas condiciones en que fue recibido. Los costos de transporte de la devolución corren por cuenta del consumidor.', 'Por tratarse de un alimento, el producto debe estar sellado y sin abrir. [VALIDAR CON ABOGADO las excepciones aplicables a bienes perecederos o de uso personal.]', 'El dinero se reintegra dentro de los 30 días calendario siguientes al ejercicio del retracto.'] },
  { id: 'reversion', title: 'Reversión del pago', paragraphs: ['Puedes solicitar la reversión del pago dentro de los 5 días hábiles siguientes a conocer la causal (fraude, operación no solicitada, producto no recibido, defectuoso o diferente al solicitado), según el art. 51 de la Ley 1480 de 2011.', PH] },
  { id: 'garantia', title: 'Garantía y cambios', paragraphs: ['Si el producto llega en mal estado o con el sello roto, escríbenos dentro de [X] días con fotos del empaque.', PH] },
  { id: 'procedimiento', title: 'Cómo solicitarlo', paragraphs: [`Escríbenos por WhatsApp o a ${EMAIL} con tu número de pedido (VX-XXXX).`, PH] },
];
