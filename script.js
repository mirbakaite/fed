console.log("JS loaded");

fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean')
  .then(res => {
    console.log("Got response:", res);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  })
  .then(data => {
    console.log("Got data:", data);
    document.querySelector('h1').textContent = data.fact;
  })
  .catch(err => {
    console.error("Something went wrong:", err);
    document.querySelector('h1').textContent = 'Fetch failed';
  });
