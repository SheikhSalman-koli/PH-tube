
const showLoader =()=>{
  document.getElementById('loadingSpinner').classList.remove('hidden')
  document.getElementById('videoContainer').classList.add('hidden')
}

const hideLoader =()=>{
  document.getElementById('loadingSpinner').classList.add('hidden')
  document.getElementById('videoContainer').classList.remove('hidden')
}

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
const loadVideoDetails=(videoId)=>{
    console.log(videoId)
    const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`

    fetch(url)
    .then(res => res.json())
    .then(data => showVideoDetails(data.video))
}  

function showVideoDetails(video){
      console.log(video)
      document.getElementById('videosDetails').showModal()
      const detailsContainer=document.getElementById('detailsContainer')
      detailsContainer.innerHTML=`
      <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
      `
}



function displayCategories(catagories){
    const btnHolder = document.getElementById('btn-holder')
    for(let cat of catagories){
        // console.log(cat)
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}"  onclick=displayCategoriesVideos(${cat.category_id}) class="btn btn-soft hover:bg-red-500 hover:text-white">${cat.category}</button>        
        `
        btnHolder.appendChild(categoryDiv)
    }
}


const loadVideos=async (searchInput = "")=>{
  showLoader()
    const fetchData=await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInput}`)
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
    <div class="card bg-base-100 mt-5">
            <figure class="relative">
              <img class="w-full h-[160px] object-cover" src="${element.thumbnail}" >
              <span class="absolute bottom-2 right-2 bg-black text-white rounded text-sm px-2 py-1">3hours 56min ago</span>
            </figure>
            <div class="flex mt-4 gap-x-3 pl-1">
              <div>
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                      <img src="${element.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div>
                <h2 class="text-base font-semibold">${element.title}</h2>
                <p class="text-gray-400 text-sm flex gap-3 items-center">${element.authors[0].profile_name}
                ${element.authors[0].verified == true ? `<img class="w-6 h-6" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="">`: `""`} </p>
                <p class="text-gray-400 text-sm">${element.others.views} views</p>
              </div>
            </div>
            <button onclick=loadVideoDetails("${element.video_id}") class="btn btn-block">show details</button>
          </div>
        `
        videoContainer.appendChild(videosDiv)
    });
    hideLoader()
}

const displayCategoriesVideos = (id) =>{
  showLoader()
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
document.getElementById('search').addEventListener('keyup',(j)=>{
    const text = j.target.value;
    // console.log(text)
    loadVideos(text)
})


loadCatagories()
