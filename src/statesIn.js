export const messages = {
  es: {
    waiting_restaurant_confirmation: {
      state: 'Pedido Solicitado',
      message: 'Hemos enviado tu pedido al restaurante y estamos esperando su confirmacion. Una vez comiencen a preparlo te informaremos.'
    },
    preparing_order: {
      state: 'Pedido en Preparacion',
      message: 'El comercio esta preparando tu orden, una vez este lista te notificaremos.'
    },
    already_restaurant:{
      state: 'Listo en el Restaurante',
      message: 'Tu pedido esta listo, ya puedes pasar por el presentando el codigo de la orden en el restaurante.'
    },
    delivering_order: {
      state: 'Recogido por el Colaborador',
      message: 'Un estudiante ha recogido tu pedido y esta en camino hacia ti'
    },
    order_completed: {
      state: 'Orden Completada',
      message: 'Gracias por Pedir en ComidaenlaU, te esperamos pronto! Con cada pedido que haces transformas poco a poco tu universidad generando empleo para estudiantes'
    },
    order_canceled_by_restaurant: {
      state: 'Cancelado por el Restaurante',
      message: 'El pedido ha sido cancelado por el restaurante. Por Favor haz tu pedido a otro restaurante.'
    },
    order_canceled_in_handoff: {
      state: 'Cancelado por el cliente',
      message: 'Hemos cancelado tu pedido porque no apareciste. Esperamos no sigas jugando a las escondidas con nosotros.'
    },
    order_canceled_by_troubleshooting_delivery_man: {
      state: 'Cancelado por el Colaborador',
      message: 'Hemos cancelado tu pedido por un problema con el estudiante que estaba llevando el pedido. Esperamos seguir mejorando para birndarte un mejor servicio.'
    },
    troubleshooting_restaurant: {
      state: 'Problemas en el Restaurantes',
      message: 'El restaurante ha tenido un problema con tu orden y esta intentando solucionarlo. Te notificaremos si el pedido es cancelado por el restaurante.'
    },
    troubleshooting_deliveryman: {
      state: 'Problemas con el Colaborador',
      message: 'El estudiante que esta llevando tu pedido ha tenido un problema, te contactara prontamente o puedes contactarlo en los datos qeu se muestran de el.'
    },
    troubleshooting_hand_off: {
      state: 'Problemas con el cliente',
      message: 'El estudiante que tiene tu pedido te ha estado buscando y nada que te encuentra, por favor contactate con El'

    },
    send_to_restaurant: {
      state: 'Enviar a restaurante'
    },
    invalid_payment: {
      state: 'Pago inválido'
    },
    accept_order: {
      state: 'Aceptar orden'
    },
    dispatch_order: {
      state: 'Despachar orden'
    },
    complete_order: {
      state: 'Completar orden'
    },
    pickup_order: {
      state: 'Orden recogida por el Colaborador'
    },
    problem_with_delivery: {
      state: 'Problemas con el colaborador'
    },
    problem_with_hand_off: {
      state: 'Problemas con el cliente'
    },
    cancel_order: {
      state: 'Cancelar orden'
    },
    reject_order: {
      state: 'Rechazar orden'
    }
    
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}
export default messages