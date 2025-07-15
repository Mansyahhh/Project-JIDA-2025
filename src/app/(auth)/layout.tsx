export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
