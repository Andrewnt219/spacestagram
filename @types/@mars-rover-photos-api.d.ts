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

  type Query = {
    sol?: number;
    camera?: RoverCamera['abbreviation'];
    page?: number;
    api_key: string;
  };
}
