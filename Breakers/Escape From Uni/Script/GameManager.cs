using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

class StoryBlock {
    public string story;
    public string option1Text;
    public string option2Text;
    public string option3Text;

    public StoryBlock option1Block;
    public StoryBlock option2Block;
    public StoryBlock option3Block;

    public Vector3 cameraPosition;

    public StoryBlock(string story, Vector3 cameraPosition, string option1Text = "", string option2Text = "", string option3Text = "",
        StoryBlock option1Block = null, StoryBlock option2Block = null, StoryBlock option3Block = null)
        { 
            this.story = story;
            this.cameraPosition = cameraPosition;
       
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

    static StoryBlock block8 = new StoryBlock("Finally! *I breathed with relief, diving through the door as it finally gave out. I scramlbed outside, sprinting away as the world glitched once more, and the building returned to normal.*", new Vector3(3600, 300, -10), "Game Over.", "Congratulations.", "You Escaped.");

    static StoryBlock block7 = new StoryBlock("The canteen! *I muttered, my voice laced with fragile hope.* Maybe the door's open. Hell, even if it's not, I can get out through there. I heard the voice behind me again and rushed forwards. Once more the door didn't budge, and that voice was getting close.", new Vector3(3600, -450, -10), "Force the door.", "Confront the presence.", "Find somewhere to hide again.", block8, block8, block8);

    static StoryBlock block6 = new StoryBlock("Library, even this place is creepy, *I shivered as I crouched between two towering shelves, my heart racing in my chest.* What's happening to me? And where is that voice coming from?", new Vector3(3600, -1200, -10), "Stay hidden in the Library.", "Search for the voice.", "Try find a way out.", block7, block7, block7);

    static StoryBlock block5 = new StoryBlock("What is the world? *I muttered as I frantically searched for somewhere to hide.* Please be a dream! Please be a dream!", new Vector3(2400, -1200, -10), "Go into Lecture Theatre.", "Head up towards Library.", "Hide in Lab Room.", block6, block6, block6);

    static StoryBlock block4 = new StoryBlock("What the HELL?! *I yelped as the world... glitched? The building around me changing into something... terrifying.* Aaah! That... what on... WHo was that? *I muttered as I frantically looked around for the source of the voice once more.", new Vector3(2400, -450, -10), "Reach out to the voice.", "Find somewhere to hide.", "Get as far away as possible.", block5, block5, block5);

    static StoryBlock block1_1 = new StoryBlock("Filler Story.", new Vector3(2300, 235, -10), "Filler1", "Filler1", "Filler1");
    static StoryBlock block3 = new StoryBlock("Oh, come on! *I groaned, futiley tugging at the locked door,* God's sakes, man. Looks like I'm locked in. Should I move down to the second level or should I go forward towards the engineering lab room ?", new Vector3(380, 235, -10), "Stay where you are.", "Expolre the Second Floor.", "Explore the Third Floor.", block4, block4, block4);

   static StoryBlock block2 = new StoryBlock("What the...? That was that?! *I muttered as I heard... something while walking down the stairs.* Huh, guess it was nothing.", new Vector3(-500, -1200, -10), "Investiage the sound.", "Yell for someone.", "Continue towards the exit.", block3, block3, block3);


    static StoryBlock block1 = new StoryBlock("Huh? *I murmured Drowsily, looking around at the empty floor.* Guess I fell asleep. What time even is it?* You pack up, and head for the exit", new Vector3(1200, 850, -10), "Head straight home.", "Stop for food.", "Phone home first.", block2, block2, block2);

    //Start is called before the first frame update
    void Start()
    {
        DisplayBlock(block1);
    }

    void DisplayBlock(StoryBlock block){

        if (block == null)
            return;

        mainText.text = block.story;
        option1.GetComponentInChildren<Text>().text = block.option1Text;
        option2.GetComponentInChildren<Text>().text = block.option2Text;
        option3.GetComponentInChildren<Text>().text = block.option3Text;

        currentBlock = block;
    }

    public void Button1Clicked(){
        DisplayBlock(currentBlock.option1Block);
        transform.position = currentBlock.cameraPosition;
     }

    public void Button2Clicked(){
        DisplayBlock(currentBlock.option2Block);
        transform.position = currentBlock.cameraPosition;
    }

     public void Button3Clicked(){
        DisplayBlock(currentBlock.option3Block);
        transform.position = currentBlock.cameraPosition;
    }
 
}