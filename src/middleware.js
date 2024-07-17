import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse, userAgent} from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/profile(.*)"]);
const isShortLinkRoute = createRouteMatcher("/id(.*)");

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        auth().protect();
    }

    // Check if the route matches the short link pattern
    if (isShortLinkRoute(req)) {
        try {
            const pathname = req.url;

            // Split the pathname by "/" and get the last part
            const parts = pathname.split("/");
            const shortId = parts[parts.length - 1];

            // Retrieve user-agent from request headers
            // const userAgent = navigator.userAgent;

            const UserAgent = userAgent(req);
            console.log("_____", UserAgent);

            // Fetch the original URL asynchronously
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/id/${shortId}`, {
                headers: {
                    useragentinfo: JSON.stringify(UserAgent),
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const res = await response.json();
            const originalUrl = res.originalUrl;

            if (!originalUrl) {
                throw new Error("Original URL is undefined or invalid");
            }

            // Redirect to the original URL
            return NextResponse.redirect(originalUrl);
        } catch (error) {
            console.error("Error handling short link route:", error);
            // Handle any errors and continue with next middleware
            return NextResponse.next();
        }
    }

    // Continue with Clerk's middleware for other routes
    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
        "/", // Run middleware on index page
        "/(api|trpc)(.*)", // Run middleware on API routes
    ],
};
