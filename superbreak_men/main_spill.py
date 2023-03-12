#Emil, Vegard og Ola

import os
import random
import math
import pygame as pg
from os import listdir
from os.path import isfile, join

pg.init()

pg.display.set_caption("Platformer")

#konstanter
WIDTH= 1200
HEIGHT= 700
FPS= 60
PLAYER_VEL= 5


window= pg.display.set_mode((WIDTH, HEIGHT))

def flip(sprites):
    return [pg.transform.flip(sprite, True, False) for sprite in sprites] #sjekker om man skal snu bilde i høyre eller venstre




def load_sprite_sheets(dir1, dir2, width, height, direction=False):
    path = join("assets", dir1, dir2) #fra os
    images = [f for f in listdir(path) if isfile(join(path, f))]

    all_sprites = {}

    for image in images: #får alle individuelle bilder i filen
        sprite_sheet = pg.image.load(join(path, image)).convert_alpha() #kan bruke trasnparent bilder

        sprites = []
        for i in range(sprite_sheet.get_width() // width):
            surface = pg.Surface((width, height), pg.SRCALPHA, 32) #lager en surface som er samme str som i 32 pixler

            rect = pg.Rect(i * width, 0, width, height)
            surface.blit(sprite_sheet, (0, 0), rect) #blir betyr draw
            sprites.append(pg.transform.scale2x(surface)) #scaler de 2x

        if direction: #Lager to versioner av hvert bilde. En mot høyre og en mot venstre
            all_sprites[image.replace(".png", "") + "_left"] = sprites #må bytte på disse to
            all_sprites[image.replace(".png", "") + "_right"] = flip(sprites) #
        else:
            all_sprites[image.replace(".png", "")] = sprites

    return all_sprites


def get_block(size):
    path= join("assets", "Terrain", "Terrain.png")
    image= pg.image.load(path).convert_alpha()
    surface= pg.Surface((size, size), pg.SRCALPHA,32)
    rect= pg.Rect(96, 0, size, size) #må justere disse hvis jeg skal ha andre bilder fra Terrain
    surface.blit(image,(0,0), rect)
    
    
    return pg.transform.scale2x(surface) 
    
    



#gjør det lett med pixel-perfect collision med sprite
class Player(pg.sprite.Sprite):
    COLOR= (255,0,0)
    GRAVITY=1
    SPRITES=load_sprite_sheets("MainCharacters", "Ove2", 50, 50, True) #True fordi vi vil ha en multidirectonal sprite
    #henter fra mappen MainCharacters-> Emil
    ANIMATION_DELAY= 4
    
    
    def __init__(self, x, y, width, height):
        super().__init__()
        self.rect= pg.Rect(x, y, width, height)
        self.x_vel= 0 #hvor fort player beveger seg i hver frame
        self.y_vel= 0
        self.mask= None
        self.direction= "left"
        self.animation_count= 0
        self.fall_count=0
        self.jump_count= 0
        
 
            
    def jump(self):
        self.y_vel = -self.GRAVITY * 8 #lar grvaity dra oss ned
        self.animation_count = 0
        self.jump_count += 1
        if self.jump_count == 1:
            self.fall_count = 0 #gjør at player blir kvitt all tyngdekraft når han hopper
        
        
        
    def move(self,dx,dy):
        self.rect.x+= dx
        self.rect.y+= dy
        
        
    def move_left(self, vel):
        self.x_vel= -vel #subrahere fra x-posisjonen
        if self.direction!= "left":
            self.direction= "left"
            self.animation_count= 0
        
        
    def move_right(self, vel):
        self.x_vel= vel
        #print("halo")
        if self.direction!= "right":
            self.direction= "right"
            self.animation_count= 0
            

            
            
        
    def loop(self, fps): #en frame er en iteration i en hvile loop
        self.y_vel += min(1, (self.fall_count/fps)*self.GRAVITY) #gir realitisk tyngdekraft 
        self.move(self.x_vel, self.y_vel)
        
        self.fall_count+=1
        
        self.update_sprite()
        
    
    def landed(self):
        self.fall_count= 0
        self.y_vel= 0 #his man lander på en block stopper man å bevege seg
        self.jump_count= 0
        
    
        
        
    def hit_head(self):
        self.count= 0
        self.y_vel *=-1 #reveserer vertikal fart så man beveger sge nedover hvis man hitter noe med hodet 
        
        
    def update_sprite(self):
        sprite_sheet= "e_idle" #hentet fra MainCharacters-> Emil
        
       
                            
        if self.y_vel< 0:
            if self.jump_count == 1 and self.animation_count < 5:
                sprite_sheet = "e_jump"
            elif self.animation_count > 5:
                sprite_sheet = "e_fall"
          
        elif self.y_vel> self.GRAVITY*2:
            sprite_sheet= "e_fall"
        

        
        elif self.x_vel!= 0:
            sprite_sheet= "e_run"
            
        sprite_sheet_name= sprite_sheet + "_" + self.direction #adder direction til sprite_sheet'et
        sprites= self.SPRITES[sprite_sheet_name]
        sprite_index= (self.animation_count // self.ANIMATION_DELAY) % len(sprites) #hver 5 frames viser vi en annen animation i hver animasjon, og får det til på funke på hver sprite_sheet
        self.sprite= sprites[sprite_index]
        self.animation_count+= 1 #nullstilles ve hver nye bevegelse? 
        self.update()
        
        
        
        
    def update(self):
        self.rect = self.sprite.get_rect(topleft= (self.rect.x, self.rect.y)) #justerer rektangel til spilleren
        self.mask = pg.mask.from_surface(self.sprite) #mapping av alle pixler i en sprite, forteller hvor det faktisk er pixler- kan gjøre pixel-perfect collision
        
        
        
    def draw(self, win):
        win.blit(self.sprite, (self.rect.x, self.rect.y)) 
        
        
        
class Object(pg.sprite.Sprite):
    def __init__(self, x, y, width, height, name= None):
        super().__init__()
        self.rect= pg.Rect(x,y,width,height) #definerer rect
        self.image= pg.Surface((width, height), pg.SRCALPHA) #transpernt images
        self.width= width
        self.height= height
        self.name= name
        
        
    def draw(self, win):
        win.blit(self.image, (self.rect.x, self.rect.y))
        
        
class Block(Object):
    def __init__(self, x, y, size):
        super().__init__(x, y, size, size)
        block= get_block(size)
        self.image.blit(block, (0,0))
        self.mask= pg.mask.from_surface(self.image) #trenger for kollisjon
        
    
    
        
        


def get_background(name): #bakgrunnen
    
    image = pg.image.load(join ("assets", "Background", name))
    
    _,_, width, height= image.get_rect() #skriver underscore for x og y men trenger ikke de
    tiles= []
    for i in range(WIDTH // width+1):
        for j in range(HEIGHT// height+1):
            pos= (i*width, j*height)
            tiles.append(pos) #fyller skjermen med tiles
            
    return tiles, image 


def draw(window, background, bg_image, player, objects):
    for tile in background:
        window.blit(bg_image, tile) #blitter tiles
        
    for obj in objects:
        obj.draw(window) #tegner på vinduet
        
    
        
    player.draw(window)
    
    pg.display.update()
    
    
def handle_vertical_collision(player, objects, dy): #dy= displacement in y
    collided_objects= []
    for obj in objects:
        if pg.sprite.collide_mask(player,obj): #forteller om player collider med object
            if dy > 0:
                player.rect.bottom= obj.rect.top #putte rplayer på toppen av objektet den kolliderer med, hvis kollidere med bakke, gjør players posisjon samme som bakken
                player.landed()
            elif dy < 0:
                player.rect.top= obj.rect.bottom
                player.hit_head()
                
        collided_objects.append(obj) #så man vet hva slags objekter man har kollidert med
        
    return collided_objects 
            
                
def handle_move(player, objects): #håndterer alle bevegelser og kollisjoner osv
    keys= pg.key.get_pressed()
    
    player.x_vel= 0
    
    if keys[pg.K_LEFT]:
        player.move_left(PLAYER_VEL)
    
    if keys[pg.K_RIGHT]:
        player.move_right(PLAYER_VEL)
        
        
    handle_vertical_collision(player, objects, player.y_vel)



#styrer al: event-loop
def main(window):
    clock= pg.time.Clock()
    background, bg_image =get_background("YELLOW.png")
    
    block_size= 96
    
    player= Player(200,300,50,50) #x,y,w,h
    
    
    floor= [Block(i*block_size, HEIGHT- block_size, block_size) for i in range(-WIDTH*2//block_size, (WIDTH*2)//block_size)] #vil lage blokker som går både venstre og høyre side av skjermen-pga scrolling background
    #hvordan funker i her? 
    #block= [Block(96, HEIGHT- 2*block_size, block_size)] #putter dem på bunnen av skjermen
    
    objects= [*floor, Block(0, HEIGHT- 2*block_size, block_size), Block(3*block_size, HEIGHT- 4*block_size, block_size), Block(7*block_size, HEIGHT- 6*block_size, block_size)] #tar alle elemter i "floor" og splitter de opp og setter de i den nye listen?
    
    
    run= True
    while run:
        clock.tick(FPS) # runner på 60 fps
        
        #sjekker for event (f.eks bevegelse eller om bruker quitter gamet)
        for event in pg.event.get():
            if event.type== pg.QUIT:
                run= False
                break #stopper loopen
            
            
            if event.type== pg.KEYDOWN: #har den her sånn at man kan tracke jump_count- bare kan hoppe én gang
                if event.key== pg.K_UP  and player.jump_count <2:
                    player.jump()
                    #player.jump_count= 0
            
            
        player.loop(FPS)
        handle_move(player, objects)
        
        
         
            
            
             
        draw(window, background, bg_image, player, objects)
            
    pg.quit()
    quit() #quitter python programmet

#kaller bare main function hvis vi kaller filen direkte? 
if __name__ == "__main__":
    main(window)
    
    




