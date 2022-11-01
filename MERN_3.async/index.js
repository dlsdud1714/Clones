const fs = require('fs');

const superagent = require('superagent');
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      resolve(data);
      if (err) reject('I could not find that file.');
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file');
      resolve('success');
    });
  });
};

const getDogPic = async ()=>{
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log (`Breed: ${data}`);
    
        const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1,res2,res3])
        const imgs = all.map (ele=> ele.body.message);
        console.log(imgs)
        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file!');

    }catch(err){
        console.log(err)
    }
}
console.log('1:will get dog pics!')
//when read 38, the it returns pending pormise and executed the promise after. use then (x=>console.log(x))
 getDogPic();

console.log('2:Done get dog pics!')


// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   //return resolved value
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   //if not resolve error will be return in catch
//   .catch((err) => console.log(err.message));

// //callback hell=> promise get is promise
