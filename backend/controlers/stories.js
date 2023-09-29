import mongoose from "mongoose";
import Story from "../models/storyContent.js";
import stories from "../data/stories.json" assert { type: "json" };


const getStories = async (req, res) => {

    try {
        const story = stories;
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const getStoriesByTag = async (req, res) => {

    let tag = req.query.tagId
    try {
        let newStories = []
        stories.forEach(function (value) {
            if(value.tags.includes(tag)){
                newStories.push(value)
            }
          });

        res.status(200).json(newStories);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const createStory = async (req, res) => {
    const body = req.body;
    let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);


    const newStory = {
        ...body,
        _id: uniqueId,
        likes: [],
        userId: req.userId,
        postDate: new Date().toISOString()
    };

    console.log("Before update: ", newStory)
    const tagArray = newStory.tags.split(",");
    newStory.tags = tagArray

    newStory.category = newStory.category
    newStory.device = newStory.device
    
    const socialArray = newStory.social.join(', ');
    newStory.social = socialArray

    try {
        stories.push(newStory);
        res.status(201).json(newStory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

const updateStory = async (req, res) => {
    const { id: _id } = req.params;

    //const story = req.body;
    const story = stories.find(t => t._id === _id);

    if (!story) {
        return res.status(404).send("This id doesnt belong to any story");
    }

    //Find index of specific object using findIndex method.    
    let objIndex = stories.findIndex(t => t._id === _id);

    //Log object to Console.
    console.log("Before update: ", stories[objIndex])

    //Update object's name property.
    stories[objIndex].caption = req.body['caption']
    stories[objIndex].tags = req.body['tags']
    stories[objIndex].image = req.body['image']


    if (typeof stories[objIndex].tags === 'string' || stories[objIndex].tags instanceof String){
        const myArray = stories[objIndex].tags.split(",");
        stories[objIndex].tags = myArray
    }

    //Log object to console again.
    console.log("After update: ", stories[objIndex])

    const updatedStory = stories[objIndex];

    res.json(updatedStory);
}

const deleteStory = async (req, res) => {
    const { id: _id } = req.params;

    const story = stories.find(t => t._id === _id);
    let objIndex = stories.findIndex(t => t._id === _id);

    if (!story) {
        return res.status(404).send("This id doesnt belong to any story");
    }

    // stories.filter(t => t._id.name != _id);
    stories.splice(objIndex, 1);

    res.json({ message: "Story deleted successfully" });
}

const likeStory = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated User" });

    const story = stories.find(t => t._id === _id);

    if (!story) {
        return res.status(404).send("This id doesnt belong to any story");
    }

    const index = story.likes.findIndex(id => id === String(req.userId));
     //Find index of specific object using findIndex method.    
     let objIndex = stories.findIndex(t => t._id === _id);

    if (index === -1) { // if user has not liked the story
        stories[objIndex].likes.push(req.userId);
    } else {
            stories[objIndex].likes.splice(index, 1); // 2nd parameter means remove one item only
        // stories[objIndex].likes.filter(t => t._id !== String(req.userId));
    }
    
    const updatedStory = stories[objIndex];

    res.json(updatedStory);
}

export { getStories, createStory, updateStory, deleteStory, likeStory, getStoriesByTag };