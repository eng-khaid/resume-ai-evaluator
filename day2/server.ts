import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const PORT = 3000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let filePath = url.pathname;

  // Handle root path
  if (filePath === "/") {
    filePath = "/index.html";
  }

  // Map routes to files
  const fileMap: Record<string, string> = {
    "/index.html": "./index.html",
    "/index1.html": "./index1.html",
    "/index2.html": "./index2.html",
    "/styles.css": "./styles.css",
    "/st.css": "./st.css",
    "/sty.css": "./sty.css",
  };

  const file = fileMap[filePath];

  if (!file) {
    return new Response("404 - Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  try {
    const content = await Deno.readFile(file);
    let contentType = "text/plain";

    if (file.endsWith(".html")) {
      contentType = "text/html; charset=utf-8";
    } else if (file.endsWith(".css")) {
      contentType = "text/css; charset=utf-8";
    } else if (file.endsWith(".js")) {
      contentType = "application/javascript; charset=utf-8";
    }

    return new Response(content, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    console.error(error);
    return new Response("500 - Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

console.log(`🚀 Deno 2 Server running on http://localhost:${PORT}`);
console.log(`📂 Available routes:`);
console.log(`   http://localhost:${PORT}/ - Main page`);
console.log(`   http://localhost:${PORT}/index1.html - Contact form`);
console.log(`   http://localhost:${PORT}/index2.html - TechBootcamp page`);

await serve(handler, { port: PORT });
