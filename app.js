const loadAllPost = async (category) => {
    const urlAPI = category ? `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}` : `https://openapi.programming-hero.com/api/retro-forum/posts`;
    try {
        const res = await fetch(urlAPI);
        const data = await res.json();
        displayAllPosts(data.posts);
    } catch (error) {
        alert("Error loading posts: " + error.message);
    }
};

loadAllPost();

const displayAllPosts = (posts) => {
    const postContainer = document.getElementById("post-container");
    document.getElementById("post-container").innerHTML = "";

    if (!posts || posts.length === 0) {
        postContainer.innerHTML = ` <div class="text-center p-6 bg-red-100 rounded-xl mt-4">
         <p class="text-4xl mb-2 text-red-500"><i class="fa-solid fa-ban"></i></p>
         <h2 class="text-xl font-bold text-red-500">Data is not available</h2></div> `;
        return;
    }

    posts.forEach(post => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex flex-col md:flex-row gap-5 rounded-3xl p-6 md:p-10 bg-gray-100 mt-3 md:mt-4">
       <!-- img -->
       <div>
        <div class="flex justify-center md:justify-start">
      <div class="avatar ${post.isActive ? "avatar-online" : "avatar-offline"}">
        <div class="w-24 rounded-full">
          <img src="${post.image}" />
        </div>
      </div>
    </div>
    </div>
    <!-- content -->
    <div class="w-full flex flex-col space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-lg md:text-xl font-mulish text-gray-600 font-bold">
        <p># <span></span>${post.category}</p>
        <p>Author: <span>${post.author.name}</span></p>
      </div>
      <!-- title -->
      <h2 class="text-xl md:text-2xl font-bold font-mulish">${post.title}</h2>
      <p class="text-gray-600 font-inter text-sm md:text-base">${post.description}</p>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-6">
          <p class="text-gray-600 text-base md:text-xl font-medium flex items-center gap-2">
            <i class="fa-solid fa-comment-dots"></i><span>${post.comment_count}</span>
          </p>
          <p class="text-gray-600 text-base md:text-xl font-medium flex items-center gap-2">
            <i class="fa-solid fa-eye"></i><span>${post.view_count}</span>
          </p>
          <p class="text-gray-600 text-base md:text-xl font-medium flex items-center gap-2">
            <i class="fa-solid fa-clock"></i><span>${post.posted_time}</span>
          </p>
        </div>
        <button class="btn rounded-full bg-[#10B981] text-white border-none">
         <i class="fa-solid fa-envelope-open"></i>
          </button>
         </div>
       </div>
        </div>
        `
        postContainer.appendChild(div);
    });

}

const handleSearchByCategory = () => {
    const search = document.getElementById("search-input").value;
    loadAllPost(search);
    document.getElementById("search-input").value = "";
}