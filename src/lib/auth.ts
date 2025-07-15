import { adminUsers, siswaList } from "@/data/akun";

export function loginUser(identifier: string, password: string) {
  const admin = adminUsers.find(
    (a) => a.username === identifier && a.password === password
  );
  if (admin) return { role: "admin", id: admin.id };

  const siswa = siswaList.find(
    (s) => s.nisn === identifier && s.password === password
  );
  if (siswa) return { role: "siswa", nisn: siswa.nisn };

  return null;
}
