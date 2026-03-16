import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Blog Post | SignalizeAI",
  description: "SignalizeAI articles on website analysis workflows and sales intelligence.",
};

export default function BlogPostPage() {
  return (
    <main style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1>Blog coming soon</h1>
      <p>We’re preparing in-depth posts on sales intelligence 🚀</p>
    </main>
  );
}
