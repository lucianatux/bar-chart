function App(){
    const [gdpData, setGdpData] = React.useState([]);
    React.useEffect(()=>{
        async function fetchData(){
            const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
            const data = await response.json();
            console.log(data);
            setGdpData(data);
        }
        fetchData();
    },[]);
    return(
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

function BarChart({data,height,width,widthOfBar, dataType}){
    React.useEffect(()=>{
        createBarChart();
    },[]);


}


ReactDOM.render(<App/>, document.getElementById('root'));