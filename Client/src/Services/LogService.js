const getLatestLogs = async (count) => {
  const url = "http://localhost:4000/logs";
  const response = await fetch(url, {
    method: "GET",
  })
  return await response.json();
};

export { getLatestLogs };
