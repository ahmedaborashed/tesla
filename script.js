import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.login = async () => {

  let usernameInput = document.getElementById("loginUsername").value;
  let passwordInput = document.getElementById("loginPassword").value;

  if(!usernameInput || !passwordInput){
    alert("ادخل البيانات ❗");
    return;
  }

  let fakeEmail = usernameInput + "@system.local";

  try {
    await signInWithEmailAndPassword(auth, fakeEmail, passwordInput);

    // 🔥 هنا التحويل
    if(usernameInput === "ahmed"){
      alert("اهلا بيك يا مستر ✅");
      window.location.href = "teacher.html"; // صفحة المدرس
    } else {
      alert("Welcome ✅");
      window.location.href = "student.html"; // صفحة الطالب
    }

  } catch (err) {
    alert("بيانات غلط ❌");
  }
};