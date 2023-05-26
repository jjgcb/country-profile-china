import { browser } from '$app/environment';
import { writable } from "svelte/store";

let sections = [];
let activeSections = [];
let observer = null;

export const pageSections = writable(sections);
export const currentSections = writable([]);
export const currentSection = writable(null);

export const addSection = (sectionID, headingID)=>{
  let exists = sections.find(d=>d.sectionID==sectionID);
  if(!exists){
    sections.push({sectionID, headingID});
    
    if(browser){
      pageSections.set(sections);
    }
  }
}

export const addObserver = (element)=>{
  if(browser){
    if(!observer){
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            let enteredSection = sections
              .find(d => d.sectionID == entry.target.getAttribute('id'));

            if(!enteredSection || !enteredSection.sectionID) return;
            if (entry.intersectionRatio > 0) {
              currentSection.set(enteredSection);
              activeSections.push(enteredSection.sectionID);
            } else {
              activeSections = activeSections.filter(d=>d!=enteredSection.sectionID)
            }
          });

        currentSections.set(sections.filter(section=>{
          return activeSections.indexOf(section.sectionID)>=0;
        }));
      });
    }
    if(element && observer){
      observer.observe(element);
    }
  }
}
