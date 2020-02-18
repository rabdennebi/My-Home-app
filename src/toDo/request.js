const token = "622e2a5a7c77c833e56b03a126fc4a8fc09cba223539f8a1b9400e42295712c9";
const kepApp = "f87ac28a969004c628a56a8b9ea58113";
const idBoards = "5e08ea2fc573bc758329c7f7";
const idLlist = "5e08eace0522c91bc47109b7";

const  mapUrl = (url) =>{
    return url.replace('{token}', token).replace('{kepApp}', kepApp).replace('{idBoards}', idBoards).replace('{idLlist}', idLlist)
}
const trelloAPI = async (url) =>{
    const data = await fetch(mapUrl(url));
    return await data.json();
}

const trelloAPIPost = async (url, card) => {
    const data = await fetch(mapUrl(url), {
      credentials: 'same-origin', // 'include', default: 'omit'
      method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
      body: JSON.stringify(card), // Coordinate the body type with 'Content-Type'
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });    
    return await data.json();
}
export const  allBoardForMe = () =>{
    return trelloAPI('https://api.trello.com/1/members/me/boards?key={kepApp}&token={token}');
} 
export const  mouveCards = (data, idList) =>{
    console.log('https://api.trello.com/1/cards/'+data.id +'/?idList='+idList +'&key={kepApp}&token={token}');
    return trelloAPIPost('https://api.trello.com/1/cards/'+data.id +'/?idList='+idList +'&key={kepApp}&token={token}', data);
} 
export const  allPluginsByBoard = () =>{
    return trelloAPI('https://api.trello.com/1/boards/{idBoards}/plugins?key={kepApp}&token={token}');
} 
export const  allMembersByBoard = () =>{
    return trelloAPI('https://api.trello.com/1/boards/{idBoards}/members?key={kepApp}&token={token}');
} 
export const  allActionsByBoard = () =>{
    return trelloAPI('https://api.trello.com/1/boards/{idBoards}/actions/?key={kepApp}&token={token}');
} 
export const  allListByBoard = () =>{
    return trelloAPI('https://api.trello.com/1/boards/{idBoards}/lists/?key={kepApp}&token={token}');
} 
export const  allCardsByBoard = () =>{
    return trelloAPI('https://api.trello.com/1/boards/{idBoards}/?cards=all&key={kepApp}&token={token}');
} 
export const  allFieldsByBoard = () =>{
    return trelloAPI('https://api.trello.com/1/boards/{idBoards}?fields=name,url&key={kepApp}&token={token}');
} 

export const  allBoardAndActionAndCardsAndList = () =>{
    return trelloAPI('https://api.trello.com/1/boards/{idBoards}?actions=all&boardStars=none&cards=none&card_pluginData=false&checklists=none&customFields=false&fields=name%2Cdesc%2CdescData%2Cclosed%2CidOrganization%2Cpinned%2Curl%2CshortUrl%2Cprefs%2ClabelNames&lists=open&members=none&memberships=none&membersInvited=none&membersInvited_fields=all&pluginData=false&organization=false&organization_pluginData=false&myPrefs=false&tags=false&key={kepApp}&token={token}');
}
export const  allCardsByList = () =>{
    return trelloAPI('https://api.trello.com/1/lists/{idLlist}/cards?key={kepApp}&token={token}');
}