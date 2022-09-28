const { PrismaClient }=require('@prisma/client');
const prisma = new PrismaClient();

const bookController={
    // addbook in books table using ORM(prisma)
    addbook:async (req,res)=>{
      if(req.body.name){
        try{
        
          const newBook =await prisma.books.create({
        
              data:{
                name:req.body.name
              }
        
            }); 
      
          res.json({newBook});
          
        }
        
        catch(e){
          console.log(e);
        }
      }else{
        res.send("you cannot add empty datas");
      }

        
},

// get allbooks from books table using ORM(prisma)
allbooks:async (req,res)=>{
    try{
  const allbooks=await prisma.books.findMany();
  res.json(allbooks);
  
    }catch(e){
      console.log(e);
    }
},

// get books from books table via id param using ORM(prisma)
idbooks:async (req,res)=>{
    const bookId=Number(req.params.id);
    const allId=await prisma.books.findUnique({
      where:{
        id:bookId
      }
    })
    if(allId){
      try{
      
        const idbooks = await prisma.books.findUnique({
    
          where: {
            id:bookId,
          },
        })
        res.json(idbooks);
      }catch(e){
        console.log(e);
      }
    }
    else{
      res.send("the id you choosed is not present");
    }
 
},

// update book from books table via id params using ORM(prisma)
updatebooks:async (req,res)=>{

    const bookId=Number(req.params.id);
    const allId=await prisma.books.findUnique({
      where:{
        id:bookId
      }
    })

if(req.body.name && allId){
  try{
    const idbooks=await prisma.books.update({
      where:{
    
        id:bookId
    },
    
    data:{
      name:req.body.name
    }
})
res.json(idbooks);
  }
  catch(e){
    console.log(e)
  }
}
else{
res.send("there is no any input filled or the id you entered is unknown");
}
  
},

// delete book from books table via id param using ORM(prisma)
deletebooks:async (req,res)=>{
    bookId=Number(req.params.id);
    const allId=await prisma.books.findUnique({
      where:{
        id:bookId
      }
    })
    if(allId){
      try {
        const idbooks=await prisma.books.delete({
          where:{
            id:bookId
          }
        })
    res.json(idbooks);
    
      } catch (e) {
        console.log(e);
      }
    }else{
      res.send("the id you entered is not there");
    }
 
}

};

module.exports=bookController;