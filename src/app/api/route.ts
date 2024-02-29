export async function GET() {
    return new Response("Hello, world!", {
        status: 200,
        headers: {
            "content-type": "text/plain",
        }
    });
}