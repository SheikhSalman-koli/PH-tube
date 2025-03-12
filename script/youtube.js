
function loadCatagories(){
    fetch(' https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res)=>res.json())
        .then(data=>{
            displayCategories(data.categories)
        })
}
  
function displayCategories(categories){
    const btnHolder = document.getElementById('btn-holder')
    
    for(let cat of categories){
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML=`
        <button class="btn btn-soft hover:bg-red-500 hover:text-white">${cat.category}</button>        
        `
        btnHolder.appendChild(categoryDiv)
    }
}


const loadVideos=async ()=>{
    const fetchData=await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await fetchData.json()
    displayVideos(data.videos)
} 
// {category_id: '1001', video_id: 'aaaa', thumbnail: 'https://i.ibb.co/L1b6xSq/shape.jpg', title: 'Shape of You', authors: Array(1), …}
// authors
// : 
// [{…}]
// category_id
// : 
// "1001"
// description
// : 
// "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// others
// : 
// {views: '100K', posted_date: '16278'}
// thumbnail
// : 
// "https://i.ibb.co/L1b6xSq/shape.jpg"
// title
// : 
// "Shape of You"
// video_id
// : 
// "aaaa"
// [[Prototype]]
// : 
// Object
const displayVideos = (videos)=>{
    const videoContainer =document.getElementById('videoContainer')
//    console.log(videoContainer)
    videos.forEach(element => {
        // console.log(element)
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

loadCatagories()
loadVideos()