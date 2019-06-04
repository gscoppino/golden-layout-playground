let data = null;

export default {
  loadData: async function() {
    if (data !== null) {
      return data;
    }

    const response = await fetch("data.json");
    data = response.json();
    return data;
  }
};
