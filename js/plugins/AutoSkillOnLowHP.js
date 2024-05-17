/*:
 * @plugindesc Executes a custom action after each individual action in battle.
 * @help This plugin allows you to run custom code after each individual action in battle.
 */

(function() {
    // Alias the invokeAction function in BattleManager
    var _BattleManager_invokeAction = BattleManager.invokeAction;

    BattleManager.invokeAction = function(subject, target) {
        // Call the original invokeAction function
        _BattleManager_invokeAction.call(this, subject, target);

        // Execute custom action
        this.executePostAction(subject, target);
    };

    // Define the custom action to be executed after each action
    BattleManager.executePostAction = function(subject, target) {
        // // Example custom action: display a message
        // $gameMessage.add(subject.name() + " has completed their action! "  + target.name());
        triggerBloodLust(subject,target)
        // Add your custom code here
        // For example, you could apply a state, adjust variables, etc.
        // if (target.hp <= 0) {
        //     $gameParty.gainGold(10); // Award gold if the target is defeated
        // }
    };

    const triggerBloodLust = (subject, target) => {
        var targetHpPercentage = (target.hp / target.mhp) * 100; 
        console.log("target hp %"  + targetHpPercentage )

        if (! target.isActor()) {
            targetHpPercentage = (target.hp / target.mhp) * 100; 
            if (targetHpPercentage  < 50 ) {
                
                // var actor = $gameActors.actor(1); // Get actor with ID 1
                // var action = new Game_Action(actor);
                // action.setSkill(29); // Set skill with ID 29
                // action.apply(actor); // Apply action on actor itself
                
                var actor = $gameActors.actor(1); // Get actor with ID 1
                var action = new Game_Action(actor);
                action.setSkill(29); // Set skill with ID 29

                // Queue the action to be executed
                actor.forceAction(29, actor.index());

                // Refresh the battle manager to process the forced action
                BattleManager.forceAction(actor);


            }
        }

    }
})();