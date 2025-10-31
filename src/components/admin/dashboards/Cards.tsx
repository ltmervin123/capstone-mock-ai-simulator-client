export default function Cards() {
  return (
    <section className="rounded-md bg-emerald-50" aria-label="dashboard summary">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Total Registered Students</h3>
          <div className="mt-2 text-3xl font-extrabold leading-none text-black">150</div>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center rounded-full border border-green-100 bg-green-50 px-2.5 py-1 font-semibold text-green-700">
              +20
            </span>
            <span className="text-gray-500">Since last month</span>
          </div>
        </article>

        <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Pending Verification</h3>
          <div className="mt-2 text-3xl font-extrabold leading-none text-black">10</div>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-2.5 py-1 font-semibold text-red-700">
              +5
            </span>
            <span className="text-gray-500">Since yesterday</span>
          </div>
        </article>

        <article className="flex min-h-[110px] flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Active Sessions</h3>
          <div className="mt-2 text-3xl font-extrabold leading-none text-black">10</div>
          <div className="mt-3 text-sm text-gray-500">&nbsp;</div>
        </article>
      </div>
    </section>
  );
}
