import Image from "next/image";

type StatCardProps = {
  type: string;
  count: number;
  label: string;
  icon: string; 
};

export function StatCard({ type, count, label, icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white shadow p-4 border hover:shadow-md transition">
      <div className="flex-shrink-0">
        <Image src={icon} alt={label} width={40} height={40} />
      </div>
      <div>
        <p className="text-xl font-bold">{count}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}
