import { JesusStudy } from "@/components/JesusStudy";
import { JesusChat } from "@/components/JesusChat";

export default function JesusPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - Jesus Study */}
          <div className="lg:col-span-2">
            <JesusStudy />
          </div>

          {/* Sidebar - AI Jesus Study Assistant */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <JesusChat />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
