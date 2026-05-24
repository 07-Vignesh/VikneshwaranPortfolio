export function ProfileImagesSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://rushikeshnimkar.com",
          },
          about: {
            "@type": "Person",
            name: "Vikneshwaran",
            description:
              "Full Stack Developer specializing in Next.js, React.js, Node.js, Clerk Authentication, MongoDB, and modern web application development.",
          },
          associatedMedia: [
            {
              "@type": "ImageObject",
              contentUrl: "https://rushikeshnimkar.com/rushikesh_nimkar.png",
              name: "Vikneshwaran - Full Stack Developer Primary Profile",
              description:
                "Primary profile photo of Vikneshwaran, Full Stack Developer",
              encodingFormat: "image/jpeg",
              width: "800",
              height: "800",
            },
            {
              "@type": "ImageObject",
              contentUrl: "https://rushikeshnimkar.com/profile.jpg",
              name: "Vikneshwaran - Full Stack Developer Alternate Profile",
              description:
                "Secondary profile photo of Vikneshwaran, showcasing professional appearance",
              encodingFormat: "image/jpeg",
              width: "800",
              height: "800",
            },
          ],
        }),
      }}
    />
  );
}
