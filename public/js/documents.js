document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileUpload");
  const fileListContainer = document.getElementById("fileList");
  let fileList = [];

  fileInput.addEventListener("change", function (e) {
    fileList = Array.from(e.target.files);
    updateFileListDisplay();
  });

  function updateFileListDisplay() {
    fileListContainer.innerHTML = "";
    fileList.forEach((file, index) => {
      const fileDisplayEl = document.createElement("div");
      fileDisplayEl.className = "p-2 flex justify-between items-center";
      fileDisplayEl.innerHTML = `
          <span>${file.name}</span>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onclick="removeFile(${index})">Eliminar</button>
        `;
      fileListContainer.appendChild(fileDisplayEl);
    });
  }

  window.removeFile = function (index) {
    fileList.splice(index, 1);
    updateFileListDisplay();
  };
});
const uploadFiles = async (e) => {
  e.preventDefault();
  console.log(e.target.files.files);
  const files = e.target.files.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  const response = await fetch("/api/users/upload-documents", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    console.log("ok");
  } else {
    console.log("error");
  }
};
