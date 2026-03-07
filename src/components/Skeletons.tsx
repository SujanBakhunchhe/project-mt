export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.3rem] border border-white/20 bg-white/10 backdrop-blur-2xl animate-pulse sm:rounded-[1.6rem]">
      <div className="aspect-[1/0.7] bg-white/5 sm:aspect-[1/0.76]"></div>
      <div className="space-y-2.5 p-3 sm:space-y-3 sm:p-4">
        <div className="h-4 w-3/4 rounded bg-white/10"></div>
        <div className="h-3 w-1/2 rounded bg-white/10"></div>
        <div className="h-8 rounded bg-white/10"></div>
        <div className="h-8 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
}

export function BrandCardSkeleton() {
  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-white/5"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-white/10 rounded w-2/3 mx-auto"></div>
        <div className="h-3 bg-white/10 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="space-y-2">
          <div className="h-5 bg-white/10 rounded w-32"></div>
          <div className="h-4 bg-white/10 rounded w-24"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 bg-white/10 rounded w-20"></div>
          <div className="h-5 bg-white/10 rounded w-16"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-6 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white/10 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-white/10 rounded w-1/3"></div>
          <div className="h-4 bg-white/10 rounded w-1/4"></div>
        </div>
        <div className="space-x-2">
          <div className="h-10 w-20 bg-white/10 rounded inline-block"></div>
          <div className="h-10 w-20 bg-white/10 rounded inline-block"></div>
        </div>
      </div>
    </div>
  );
}
