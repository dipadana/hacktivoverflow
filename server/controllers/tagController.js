const Question = require('../models/question')

class TagController {
  static async getAllTag (req,res,next) {
    try{
      const data = await Question.find()
      let countData = []
      for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].tags.length; j++){
          if(countData.length === 0){
            countData.push({
              text: data[i].tags[j],
              value: data[i].tags[j],
              count: 1
            })
          }
          else{
            for(let k = 0; k < countData.length; k++){
              if(data[i].tags[j] == countData[k].text){
                countData[k].count += 1
              }
              else{
                let sameX = false
                for(let l = 0; l < countData.length; l++){
                  if(data[i].tags[j] === countData[l].text){
                    sameX = true
                  }
                }
                if(sameX == false){
                  countData.push({
                    text: data[i].tags[j],
                    value: data[i].tags[j],
                    count: 0
                  })
                }
              }
            }
          }
        }
      }
      res.status(200).json(countData)
    }
    catch(err){
      next(err)
    }
  }
}

module.exports = TagController