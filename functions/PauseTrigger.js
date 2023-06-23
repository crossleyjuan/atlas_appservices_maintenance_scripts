exports = async function() {
  
  // Supply projectID and clusterNames...
  const projectID = context.values.get("projectID");

// Get stored credentials...
  const username = context.values.get("PublicKey");
  const password = context.values.get("PrivateKey");

  const clusters = await context.functions.execute('getAllClusters', username, password, projectID);
  
  const clusterNames = clusters["results"].map(c => c["name"]);
  
  console.log(JSON.stringify(clusterNames));
  
  // Set desired state...
  const body = {paused: true};

  var result = "";
  clusterNames.forEach(async function (name) {
    result = await context.functions.execute('modifyCluster', username, password, projectID, name, body)
    console.log("Cluster " + name + ": " + EJSON.stringify(result));
    
    if (result.error) { 
      return result;
    }
  })

  return clusterNames.length + " clusters paused";   
 
  
};

