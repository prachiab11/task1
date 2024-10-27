import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  hierarchicalData: any;

  ngOnInit() {
   
    const firstLevelArr = [
      { id: "1", name: "India" },
      { id: "2", name: "Germany" }
    ];

    const secondLevelArr = [
      { id: "s1", parentId: "2", name: "Bavaria" },
      { id: "s2", parentId: "2", name: "Berlin" },
      { id: "s3", parentId: "1", name: "Maharashtra" },
      { id: "s4", parentId: "1", name: "Tamilnadu" }
    ];

    const thirdLevelArr = [
      { id: "d1", parentId: "s1", name: "Upper Bavaria" },
      { id: "d2", parentId: "s1", name: "Lower Bavaria" },
      { id: "d3", parentId: "s2", name: "Berlin-Mitte" },
      { id: "d4", parentId: "s2", name: "Kreuzberg" },
      { id: "d5", parentId: "s3", name: "Nashik" },
      { id: "d6", parentId: "s3", name: "Jalgoan" },
      { id: "d7", parentId: "s4", name: "Ariyalur" },
      { id: "d8", parentId: "s4", name: "Chennai" }
    ];

    const fourthLevelArr = [
      { id: "p1", parentId: "d1", name: "Munich" },
      { id: "p2", parentId: "d1", name: "Erding" },
      { id: "p3", parentId: "d2", name: "Leipzig" },
      { id: "p4", parentId: "d2", name: "Landshut" },
      { id: "p5", parentId: "d3", name: "Passau" },
      { id: "p6", parentId: "d3", name: "Gesundbrunnen" },
      { id: "p7", parentId: "d4", name: "Frieburg" },
      { id: "p8", parentId: "d4", name: "Hamburg" },
      { id: "p9", parentId: "d6", name: "Raver" },
      { id: "p10", parentId: "d6", name: "Savda" },
      { id: "p11", parentId: "d5", name: "Ozar" },
      { id: "p12", parentId: "d5", name: "Manmad" },
      { id: "p13", parentId: "d7", name: "Thirumanur" },
      { id: "p14", parentId: "d7", name: "Sendurai" },
      { id: "p15", parentId: "d8", name: "New Chennai" },
      { id: "p16", parentId: "d8", name: "Old Chennai" }
    ];

   
    function buildHierarchy(firstArr: any[], secondArr: any[], thirdArr: any[], fourthArr: any[]) {
      const result: any = { countries: {} };

      firstArr.forEach(country => {
        result.countries[country.id] = { countryName: country.name, states: {} };
      });

      secondArr.forEach(state => {
        if (result.countries[state.parentId]) {
          result.countries[state.parentId].states[state.id] = { stateName: state.name, districts: {} };
        }
      });

      thirdArr.forEach(district => {
        for (let countryId in result.countries) {
          const country = result.countries[countryId];
          if (country.states[district.parentId]) {
            country.states[district.parentId].districts[district.id] = { districtName: district.name, places: {} };
          }
        }
      });

      fourthArr.forEach(place => {
        for (let countryId in result.countries) {
          const country = result.countries[countryId];
          for (let stateId in country.states) {
            const state = country.states[stateId];
            if (state.districts[place.parentId]) {
              state.districts[place.parentId].places[place.id] = { placeName: place.name };
            }
          }
        }
      });

      return result;
    }

    this.hierarchicalData = buildHierarchy(firstLevelArr, secondLevelArr, thirdLevelArr, fourthLevelArr);
  }
}