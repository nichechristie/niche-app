import { KingsStudy } from "@/components/KingsStudy";
import { KingsChat } from "@/components/KingsChat";

export default function KingsPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - Kings History Study */}
          <div className="lg:col-span-2">
            <KingsStudy />
          </div>

          {/* Sidebar - AI Kings History Assistant */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <KingsChat />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
