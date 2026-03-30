import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔥 loading function
function startLoading(redirectPage) {
  const loadingScreen = document.getElementById("loadingScreen");
  const countText = document.getElementById("loadingCount");

  let time = 5;

  // اقفل الفورم
  document.getElementById("login").style.display = "none";

  // افتح شاشة اللودينج
  loadingScreen.style.display = "flex";

  countText.innerText = time;

  const interval = setInterval(() => {
    time--;
    countText.innerText = time;

    if (time <= 0) {
      clearInterval(interval);
      window.location.href = redirectPage;
    }
  }, 1000);
}


// 🔐 login الرئيسي
window.login = async () => {

  let usernameInput = document.getElementById("loginUsername").value.trim();
  let passwordInput = document.getElementById("loginPassword").value.trim();

  if(!usernameInput || !passwordInput){
    alert("ادخل البيانات ❗");
    return;
  }

  // 🔥 نجرب الأول teacher
  let teacherEmail = usernameInput + "@system.local";
  let studentEmail = usernameInput + "@student.local";

  try {
    // ✅ نحاول كمدرس
    await signInWithEmailAndPassword(auth, teacherEmail, passwordInput);

    // لو نجح → Teacher
    startLoading("teacher.html");

  } catch (err1) {

    try {
      // 🔥 لو فشل → نجرب Student
      await signInWithEmailAndPassword(auth, studentEmail, passwordInput);

      startLoading("student.html");

    } catch (err2) {
      alert("بيانات غلط ❌");
      console.error(err2);
    }

  }
};