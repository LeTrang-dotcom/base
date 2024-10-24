
const listChat = [
    {
        id: 1,
        avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
        name: "Alice",
        content: "Hoorayy!!",
        timestamp: new Date(Date.now() - 1000 * 10).toISOString() // 10 giây trước
    },
    {
        id: 2,
        avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
        name: "Martin",
        content: "I’m doing well, thanks! How about you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 phút trước
    },
    {
        id: 3,
        avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
        name: "Charlie",
        content: "Just working on some projects.",
        timestamp: new Date(Date.now() - 1000 * 3600 * 2).toISOString() // 2 giờ trước
    },
    {
        id: 4,
        avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
        name: "David",
        content: "Sounds great! Any new ideas?",
        timestamp: new Date(Date.now() - 1000 * 86400 * 3).toISOString() // 3 ngày trước
    },
    {
        id: 5,
        avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
        name: "Ella",
        content: "I started learning JavaScript.",
        timestamp: new Date(Date.now() - 1000 * 604800 * 1).toISOString() // 1 tuần trước
    },
    {
        id: 6,
        avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
        name: "Bob",
        content: "That's awesome! Keep it up!",
        timestamp: new Date(Date.now() - 1000 * 2592000 * 2).toISOString() // 2 tháng trước
    }
];

function timeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now - then) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (seconds < 60) {
        return `${seconds} giây trước`;
    } else if (minutes < 60) {
        return `${minutes} phút trước`;
    } else if (hours < 24) {
        return `${hours} giờ trước`;
    } else if (days < 7) {
        return `${days} ngày trước`;
    } else if (weeks < 4) {
        return `${weeks} tuần trước`;
    } else {
        return `${months} tháng trước`;
    }
}

class ChatDTO {
    constructor(id, avatar, name, content, timestamp) {
        this.id = id;
        this.avatar = avatar;
        this.name = name;
        this.content = content;
        this.timestamp = timestamp;
    }
}

function toChatDTO(userchat) {
    return new ChatDTO(userchat.id, userchat.avatar, userchat.name, userchat.content, userchat.timestamp);
}

const listChatDTO = listChat.map(toChatDTO);

const toggleMenu = document.getElementById("toggle-menu");
const toggleMenuBtn = document.getElementById("toggle-menu-btn");
const searchInput = document.getElementById("search-input");
const searchOrDeleteImg = document.getElementById("search-or-delete");
const chatHeader = document.getElementById("chat-header");

toggleMenuBtn.addEventListener("click", () => {
    if (toggleMenu.classList.contains("hidden")) {
        toggleMenu.classList.remove("hidden");
    } else {
        toggleMenu.classList.add("hidden");
    }
});

window.addEventListener("click", (event) => {
    if (!toggleMenu.contains(event.target) && !toggleMenuBtn.contains(event.target)) {
        toggleMenu.classList.add("hidden");
    }
});

searchInput.addEventListener("input", () => {
    if (searchInput.value != "") {
        searchOrDeleteImg.src = "./assets/image/x.svg";
        searchOrDeleteImg.alt = "X";
        searchOrDeleteImg.classList.remove("w-5", "h-5");
        searchOrDeleteImg.classList.add("w-2", "h-4");
        displaySearch(listChatDTO, searchInput.value);
    }else{
        displayEachChat(listChatDTO);
    }
});

function clearSearch() {
    searchInput.value = "";
    searchOrDeleteImg.src = "./assets/image/magnifying-glass.svg";
    searchOrDeleteImg.alt = "magnifying glass";
    searchOrDeleteImg.classList.add("w-5", "h-5");
    displayEachChat(listChatDTO);
}





// Hàm để hiển thị thời gian đã trôi qua

console.log(listChatDTO);
// // Giả sử bạn có các thẻ img trong HTML như sau:
// const imgElements = document.querySelectorAll('img');

// // Duyệt qua các phần tử img và thêm alt bằng name từ userDTOs
// imgElements.forEach((img, index) => {
//     if (userDTOs[index]) {
//         img.alt = userDTOs[index].name; // Thêm name vào thuộc tính alt
//     }
// });
const areaListChat = document.getElementById("area-list-chat");
function displayEachChat(arr) {
    areaListChat.innerHTML = "";
    arr.forEach((item) => {
        areaListChat.innerHTML += `
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onclick="switchConversation(this)" data-avatar="${item.avatar}" data-name="${item.name}">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="${item.avatar}" alt="${item.name}"
                        class="w-12 h-12 rounded-full">
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">${item.name}</h2>
                    <p class="text-gray-600">${item.content}</p>
                </div>
            </div>
        `;
        
    });
}

function displaySearch(arr, str){
    areaListChat.innerHTML = "";
    let listSearch = arr.filter((item) => item.name.toLowerCase().includes(str.toLowerCase()));
    listSearch.forEach((item) => {
        areaListChat.innerHTML += `
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src="${item.avatar}" alt="${item.name}"
                        class="w-12 h-12 rounded-full">
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">${item.name}</h2>
                </div>
            </div>
        `;
    });
}

displayEachChat(listChatDTO);

function displayHeaderChat(avatar, name){
    chatHeader.innerHTML = `
        <div class="flex items-center">
            <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="${avatar}" alt="${name}"
                    class="w-12 h-12 rounded-full">
            </div>
            <h1 class="text-2xl font-semibold">${name}</h1>
        </div>
        <div class="w-5">
            <img src="./assets/image/ellipsis.svg" alt="ellipsis">
        </div>
    `;
}

const conversationView = document.getElementById("conversation-view");
function switchConversation(element){
    const avatar = element.dataset.avatar;
    const name = element.dataset.name;
    displayHeaderChat(avatar, name);
    conversationView.innerHTML = "1";
    console.log(element);
}
