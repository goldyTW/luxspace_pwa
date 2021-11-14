import React from 'react';
// import { Route, Router } from 'workbox-routing';
import AsideMenu from './component/AsideMenu';
import BrowseRoom from './component/BrowseRoom';
import Clients from './component/Clients';
import Footer from './component/Footer';
import Header from './component/Header';
import Hero from './component/Hero';
import JustArrived from './component/JustArrived';
// import Details from './pages/Details';
import Offline from './component/Offline';

function App() {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);
  function handleofflinestatus(){
    setOfflineStatus(!navigator.onLine);
  }
  React.useEffect(function(){
    (async function () {
      const response = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // 'x-api-key': process.env.REACT_APP_APIKEY
        }
      });
      const {nodes} = await response.json();
      setItems(nodes);

      const script = document.createElement("script");
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);
    })();

    handleofflinestatus();
    window.addEventListener('online', handleofflinestatus);
    window.addEventListener('offline', handleofflinestatus);

    return function(){
      window.removeEventListener('online', handleofflinestatus);
      window.removeEventListener('offline', handleofflinestatus);

    }
    
  }, [offlineStatus]);

  return (
    <>
    {offlineStatus && <Offline/>}
    <Header></Header>
    <Hero></Hero>
    <BrowseRoom></BrowseRoom>
    <JustArrived items={items}></JustArrived>
    <Clients></Clients>
    <AsideMenu></AsideMenu>
    <Footer></Footer>
    </>
//     <div class="flex">
//   <div class="flex-none w-48 relative">
//     <img src="/classic-utility-jacket.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" />
//   </div>
//   <form class="flex-auto p-6">
//     <div class="flex flex-wrap">
//       <h1 class="flex-auto text-xl font-semibold">
//         Classic Utility Jacket
//       </h1>
//       <div class="text-xl font-semibold text-gray-500">
//         $110.00
//       </div>
//       <div class="w-full flex-none text-sm font-medium text-gray-500 mt-2">
//         In stock
//       </div>
//     </div>
//     <div class="flex items-baseline mt-4 mb-6">
//       <div class="space-x-2 flex">
//         <label>
//           <input class="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg" name="size" type="radio" value="xs" checked/>
//           XS
//         </label>
//         <label>
//           <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="s"/>
//           S
//         </label>
//         <label>
//           <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="m"/>
//           M
//         </label>
//         <label>
//           <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="l"/>
//           L
//         </label>
//         <label>
//           <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="xl"/>
//           XL
//         </label>
//       </div>
//       <div class="ml-auto text-sm text-gray-500 underline">Size Guide</div>
//     </div>
//     <div class="flex space-x-3 mb-4 text-sm font-medium">
//       <div class="flex-auto flex space-x-3">
//         <button class="w-1/2 flex items-center justify-center rounded-md bg-black text-white" type="submit">Buy now</button>
//         <button class="w-1/2 flex items-center justify-center rounded-md border border-gray-300" type="button">Add to bag</button>
//       </div>
//       <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300" type="button" aria-label="like">
//         <svg width="20" height="20" fill="currentColor">
//           <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
//         </svg>
//       </button>
//     </div>
//     <p class="text-sm text-gray-500">
//       Free shipping on all continental US orders.
//     </p>
//   </form>
// </div>

  );
}

export default App;

// export default function Routes(){
//   return(
//     <Router>
//       <Route path="/" exact component={App}></Route>
//       <Route path="/detail:id" exact component={Details}></Route>
//       {/* <Route path="/profile" exact component={Profile}></Route> */}
//     </Router>
//   )
// }