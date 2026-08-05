async function main() {
  try {
    const response = await fetch("http://localhost:3000/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello! Who are you?" }],
        persona: "ai"
      }),
    });
    
    if (!response.ok) {
      console.error(`HTTP Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error("Body:", text);
      return;
    }
    
    const data = await response.json();
    console.log("Success! Response from agent:");
    console.log(data);
  } catch (err) {
    console.error("Error making request:", err);
  }
}

main();
