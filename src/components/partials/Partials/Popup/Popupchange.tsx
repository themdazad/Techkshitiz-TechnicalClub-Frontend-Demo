function Popupchange() {
  const chartshowmessages = document.querySelector("#chartshowmessage");
  if (chartshowmessages !== null) {
    if (chartshowmessages.classList.contains("hidden")) {
      chartshowmessages.classList.remove("hidden");
    } else {
      chartshowmessages.classList.add("hidden");
    }
  }
}

export default Popupchange;

export function VerifyChange() {
  const chartshowmessages = document.querySelector("#Verify_Submit");
  if (chartshowmessages !== null) {
    if (chartshowmessages.classList.contains("hidden")) {
      chartshowmessages.classList.remove("hidden");
    } else {
      chartshowmessages.classList.add("hidden");
    }
  }
}


