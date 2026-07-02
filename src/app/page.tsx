import AlgorithmSidebar from "../components/layout/algorithm-sidebar";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <main className="flex-1 bg-[#12141a]"></main>
      <AlgorithmSidebar />
    </div>
  );
}
