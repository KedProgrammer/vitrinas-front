export const stateGroups = {
  vigentes: ["started","waiting_for_external_payment","waiting_restaurant_confirmation"
  ,"preparing_order","waiting_pickup_client", "waiting_pickup_deliveryman","delivering_order"],
  intermedio: ["started","waiting_restaurant_confirmation"
  ,"preparing_order","waiting_pickup_client", "waiting_pickup_deliveryman","delivering_order"],
  recogidos: ["delivering_order"],
  entregados: ["order_completed"],
  problemas: ["troubleshooting_restaurant","troubleshooting_deliveryman","troubleshooting_hand_off"],
  all: ["started","waiting_for_external_payment","waiting_restaurant_confirmation"
  ,"preparing_order","waiting_pickup_client", "waiting_pickup_deliveryman","delivering_order",
  "troubleshooting_restaurant","troubleshooting_deliveryman","troubleshooting_hand_off","order_completed"],
  pending: ["started","waiting_for_external_payment","waiting_restaurant_confirmation"
  ,"preparing_order","waiting_pickup_client", "waiting_pickup_deliveryman",
  "troubleshooting_restaurant"]
}