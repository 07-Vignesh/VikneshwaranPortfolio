export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Viknesh Waran",
          url: "https://vikneshwaran.dev",
          sameAs: [
            "https://github.com/07-Vignesh",
            "https://www.linkedin.com/in/viknesh-waran/",
            "https://x.com/RushikeshN22296"
          ],
          jobTitle: "Full Stack Developer",
          knowsAbout: ["Web Development", "Blockchain", "TypeScript", "React", "Next.js"],
          image: "/profile.jpg",
          description: "Full Stack Developer specializing in Next.js, React.js, Node.js, Clerk Authentication, MongoDB, and modern web application development."
        })
      }}
    />
  );
} 