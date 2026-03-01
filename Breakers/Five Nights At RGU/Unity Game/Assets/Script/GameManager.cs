using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

    class StoryBlock
{
    public string story;
    public string option1Text;
    public string option2Text;
    public string option3Text;
    public StoryBlock option1Block;
    public StoryBlock option2Block;
    public StoryBlock option3Block;

    public StoryBlock (string story, string option1Text = "", string option2Text = "", string option3Text = "", 
        StoryBlock option1Block = null, StoryBlock option2Block = null, StoryBlock option3Block = null){

        this.story = story;
        this.option1Text = option1Text;
        this.option2Text = option2Text;
        this.option3Text = option3Text;
        this.option1Block = option1Block;
        this.option2Block = option2Block;
        this.option3Block = option3Block;
    }
}

public class GameManager : MonoBehaviour
{
    public Text mainText;
    public Button option1;
    public Button option2;
    public Button option3;

    StoryBlock currentBlock;
    
    static StoryBlock block111 = new StoryBlock("Filler Story", "Filler11", "Filler11", "Filler11", null, null, null);
    static StoryBlock block112 = new StoryBlock("Filler Story, Filler12", "Filler12", "Filler12", null, null, null);
    static StoryBlock block113 = new StoryBlock("Filler Story, Filler13", "Filler13", "Filler13", null, null, null);

    static StoryBlock block11 = new StoryBlock("Filler Story", "Filler1", "Filler1", "Filler1", block111, block112, block113);
    static StoryBlock block12 = new StoryBlock("Filler Story", "Filler2", "Filler2", "Filler2", null, null, null);
    static StoryBlock block13 = new StoryBlock("Filler Story", "Filler3", "Filler3", "Filler3", null, null, null);

    static StoryBlock block1 = new StoryBlock("Alright. Well I'm stuck in this place for the time being. Can't just sit on my ass and do nothing about it so where do I start?",
        "Pull the fire alarm", "Rummage through your backpack for things to use", "Explore the origin of the sound", block11, block12, block13);

    // Start is called before the first frame update
    void Start()
    {
        DisplayBlock(block1);
    }

    void DisplayBlock(StoryBlock block){
        mainText.text = block.story;
        option1.GetComponentInChildren<Text>().text = block.option1Text;
        option2.GetComponentInChildren<Text>().text = block.option2Text;
        option3.GetComponentInChildren<Text>().text = block.option3Text;

        currentBlock = block;
    }

    public void Button1Clicked(){
        DisplayBlock(currentBlock.option1Block);
     }

    public void Button2Clicked(){
        DisplayBlock(currentBlock.option2Block);
     }

     public void Button3Clicked(){
        DisplayBlock(currentBlock.option3Block);
     }
 
}