import { MythologyStudy } from "@/components/MythologyStudy";
import { MythologyChat } from "@/components/MythologyChat";

export default function MythologyPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - Mythology Study */}
          <div className="lg:col-span-2">
            <MythologyStudy />
          </div>

          {/* Sidebar - AI Mythology Guide */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <MythologyChat />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
