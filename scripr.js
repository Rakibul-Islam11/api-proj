
"use strict"

let catchInpt = document.getElementById("searINPT");
let catchBtn = document.getElementById("Btn");
let catchinptEL = document.getElementById("forCreateEL");
let catchELTwo = document.getElementById("forCreateELtwo");
let catchhdorssh = document.getElementById("hdorsh");
let catchcnt = document.getElementById("cont");

let appendCounter = 0; // append গননার জন্য একটি কাউন্টার

function getInptValue() {
    let getInptval = catchInpt.value;
    return getInptval;
}

async function apiFunc() {
    let apiUrl = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${getInptValue()}`;
    let callApi = await fetch(apiUrl);
    let convrt = await callApi.json();
    let filterr = convrt.posts;
    catchinptEL.innerHTML = '';
    filterr.forEach(post => {
        console.log(post);
        let crtNewEL = document.createElement("div");

        crtNewEL.innerHTML = `
            <div class="discuss_body flex flex-row gap-3 p-5 m-5 bg-slate-400">
                <div class="user_img">
                    <img style="width: 65px;" src="${post.image}" alt="">
                </div>
                <div class="discuc_text">
                    <p>#music</p>
                    <p>author: ${post.author.name}</p>
                    <p class="font-bold">${post.title}</p>
                    <p>${post.description}</p>
                    <div class="border-t border-dashed border-gray-300 my-4"></div>
                    <div class="all_icons_devider flex justify-between">
                        <div class="all_icon_wrap flex flex-row gap-4">
                            <span>${post.comment_count}</span>
                            <span>${post.view_count}</span>
                            <span>${post.posted_time} min</span>
                        </div>
                        <button onclick="readFunc('${post.title}', '${post.view_count}', true)" id="readBtn">
                            <svg style="width: 25px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        catchinptEL.appendChild(crtNewEL);
    });
}

let resultShown = {}; // ফ্ল্যাগ হিসেবে একটি অবজেক্ট ব্যবহার করা হচ্ছে

function readFunc(reciveTITLE, recevieWatch, rectrue) {
    if (resultShown[reciveTITLE]) {
        return;
    }

    if (rectrue) {
        catchhdorssh.classList.remove("hidden");
    } else {
        catchhdorssh.classList.add("hidden");
    }

    let crtELtwoo = document.createElement("div");
    crtELtwoo.innerHTML = `
        <div class="flex justify-between bg-slate-100">
            <div class="read_in">
                <p>${reciveTITLE}</p>
            </div>
            <div class="wrp">
                <span>${recevieWatch}</span>
            </div>
        </div>
    `;

    catchELTwo.appendChild(crtELtwoo);

    // প্রতি অ্যাপেন্ডের সময় কাউন্টার ১ বাড়বে
    appendCounter = appendCounter + 1;
    catchcnt.innerHTML = `
        <span>(${appendCounter})</span>
    `
    
    console.log(`Total appended elements: ${appendCounter}`);

    // নির্দিষ্ট টাইটেলের জন্য ফ্ল্যাগ সেট করা হচ্ছে
    resultShown[reciveTITLE] = true;
}

catchBtn.addEventListener("click", function () {
    apiFunc();
});
