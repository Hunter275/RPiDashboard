import {
  getAuth,
  createConnection,
  ERR_HASS_HOST_REQUIRED,
} from "home-assistant-js-websocket";

const toggle = (entity_id) => {
	let url = "/api/services/switch/toggle";
	if (entity_id.includes("light")) {
		url = "/api/services/light/toggle";
	}
	fetch(url, {
		method: "POST",
		credentials: "include",
		headers: new Headers({
			Authorization: `Bearer ${import.meta.env.VITE_HATOKEN}`,
		}),
		body: JSON.stringify({
			entity_id: entity_id,
		}),
	})
		.then((response) => response.json())
		.then((responseData) => {
			console.log(responseData);
		})
		.catch((error) => {
			console.log(error);
		});
};

const getState = async (entity_id) => {
	const url = `/api/states/${entity_id}`;
	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: new Headers({
			Authorization: `Bearer ${import.meta.env.VITE_HATOKEN}`,
		})
	})
  return await response.json();
};

const getSocketConnection = async () => {
  let auth;
  try {
    // Try to pick up authentication after user logs in
    auth = await getAuth();
  } catch (err) {
    if (err === ERR_HASS_HOST_REQUIRED) {
      const hassUrl = "http://192.168.1.177:8123"
      // Redirect user to log in on their instance
      auth = await getAuth({ hassUrl });
    } else {
      alert(`Unknown error: ${err}`);
      return;
    }
  }
  const connection = await createConnection({ auth });
  return connection;
}

export { toggle, getState, getSocketConnection };
