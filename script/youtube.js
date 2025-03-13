
function removeActiveClass(){
    const activeButtons = document.getElementsByClassName('active')
    // console.log(activeButtons)
    for(let btn of activeButtons)(
      // console.log(btn)
      btn.classList.remove("active")
    )
}

function loadCatagories(){
    fetch(' https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res)=>res.json())
        .then(data=>{
            displayCategories(data.categories)
        })
}
  
function displayCategories(catagories){
    const btnHolder = document.getElementById('btn-holder')
    for(let cat of catagories){
        // console.log(cat)
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}"  onclick="displayCategoriesVideos(${cat.category_id})" class="btn btn-soft hover:bg-red-500 hover:text-white">${cat.category}</button>        
        `
        btnHolder.appendChild(categoryDiv)
    }
}


const loadVideos=async ()=>{
    const fetchData=await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await fetchData.json()
    removeActiveClass()
    document.getElementById('btnAll').classList.add("active")
    displayVideos(data.videos)
} 

const displayVideos = (videos)=>{
    const videoContainer =document.getElementById('videoContainer')
    videoContainer.innerHTML= ""

    if(videos.length === 0){
      videoContainer.innerHTML = `
       <div class="col-span-full flex justify-center items-center flex-col py-4">
          <img src="Icon.png" alt="">
          <h2>Oops!! Sorry, There is no content here</h2>
        </div>
      `
      // return
    }
    videos.forEach(element => {
        const videosDiv = document.createElement('div')
        videosDiv.innerHTML = `
    <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[160px] object-cover" src="${element.thumbnail}" >
              <span class="absolute bottom-2 right-2 bg-black text-white rounded text-sm px-2 py-1">3hours 56min ago</span>
            </figure>
            <div class="flex mt-4 gap-x-3 pl-1 pb-8">
              <div>
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                      <img src="${element.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div>
                <h2 class="text-base font-semibold">${element.title}</h2>
                <p class="text-gray-400 text-sm flex gap-3 items-center">${element.authors[0]. profile_name} <img class="w-6 h-6" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt=""></p>
                <p class="text-gray-400 text-sm">${element.others.views} views</p>
              </div>
            </div>
          </div>
        `
        videoContainer.appendChild(videosDiv)
    });

}

const displayCategoriesVideos = (id) =>{
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
//    console.log(url)
    fetch(url)
    .then(Response => Response.json())
    .then(data => {
      removeActiveClass()
      const clickedbtn = document.getElementById(`btn-${id}`)
      clickedbtn.classList.add("active")
      // console.log(clickedbtn)
      displayVideos(data.category)
    })
}

loadCatagories()
