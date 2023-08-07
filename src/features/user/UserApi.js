export function fetchLoggedInUserOrders(user) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/?user.id=${user}`);
    const data = await response.json();
    resolve({ data });
  });
}
