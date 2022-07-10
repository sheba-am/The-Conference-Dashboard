import React, { useState, createContext } from "react";
// import Papers from "../components/Papers";
// import PaperDetails from "../components/PaperDetails";
export const PaperContext = createContext(null);

// this context is used when we click on "more" in papers component we can see the details of that paper in paper details component
// var paperData = [
//     {
//         id:'1001',
//         title:'ba project',
//         authors: ['auther one','auther two'],
//         judges: ['judge 1','judge 2'],
//         language: 'en',
//         field: 'computer science',
//         summery: 'this is a test case',
//         file:'',
//         method_of_presentation:'slide',
//         number_of_pages:'56',
//         scores:['18','15'],
//         avg_score:'18',
//         judge_feedback:['fine','ok'],
//         state: ['passed','passed'],
//         send_date:'2022-1-1',
//         abstract:'Foxes are small to medium-sized, omnivorous mammals belonging to several genera of the family Canidae. They have a flattened skull, upright triangular ears, a pointed, slightly upturned snout, and a long bushy tail (or brush).Twelve species belong to the monophyletic "true foxes" group of genus Vulpes. Approximately another 25 current or extinct species are always or sometimes called foxes; these foxes are either part of the paraphyletic group of the South American foxes, or of the outlying group, which consists of the bat-eared fox, gray fox, and island fox',
        
//     }
//   ];
// export const focusedPaperContext = createContext("hii");

// function PaperDetailsContext() {
//   const [paper, setPaper] = useState([]);

//   return (
//     <focusedPaperContext.Provider value={{ paper, setPaper }}>
//         <Papers /> <PaperDetails />
//     </focusedPaperContext.Provider>
//   );
// }

// export default PaperDetailsContext;