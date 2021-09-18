declare module '@mars-rover-photos-api' {
  type CuriosityCamera = {
    rover_id: 'curiosity';
    abbreviation:
      | 'FHAZ'
      | 'RHAZ'
      | 'MAST'
      | 'CHEMCAM'
      | 'MAHLI'
      | 'MARDI'
      | 'NAVCAM';
  };

  type OpportunityCamera = {
    rover_id: 'opportunity';
    abbreviation: 'FHAZ' | 'RHAZ' | 'NAVCAM' | 'PANCAM' | 'MINIES';
  };

  type SpiritCamera = {
    rover_id: 'spirit';
    abbreviation: 'FHAZ' | 'RHAZ' | 'NAVCAM' | 'PANCAM' | 'MINIES';
  };

  type RoverCamera = CuriosityCamera | OpportunityCamera | SpiritCamera;

  type MarsRoverPhotosQuery = {
    sol?: number;
    camera?: RoverCamera['abbreviation'];
    page?: number;
    rover_id: RoverCamera['rover_id'];
  };

  type MarsRoverPhoto = {
    id: number;
    sol: number;
    camera: {
      id: number;
      name: string;
      rover_id: number;
      full_name: string;
    };
    img_src: string;
    earth_date: string;
    rover: {
      id: number;
      name: string;
      landing_date: string;
      launch_date: string;
      status: 'active' | 'deactive';
    };
  };

  type MarsRoverPhotosResponse = {
    photos: MarsRoverPhoto[];
  };
}
